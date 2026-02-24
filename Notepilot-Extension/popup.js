let stream = null;
let audioContext = null;
let processor = null;
let socket = null;

/* =========================
   START CAPTURE
========================= */
document.getElementById("start").addEventListener("click", () => {
  chrome.tabCapture.capture(
    { audio: true, video: false },
    (mediaStream) => {
      if (!mediaStream) {
        console.error("❌ Capture failed", chrome.runtime.lastError);
        alert("Capture failed");
        return;
      }

      stream = mediaStream;
      startAudioProcessing(stream);

      alert("Audio capture + streaming started");
    }
  );
});

/* =========================
   STOP CAPTURE
========================= */
document.getElementById("stop").addEventListener("click", () => {
  if (processor) processor.disconnect();
  if (audioContext) audioContext.close();
  if (stream) stream.getTracks().forEach(t => t.stop());
  if (socket) socket.close();

  stream = null;
  audioContext = null;
  processor = null;
  socket = null;

  alert("Audio capture stopped");
});

/* =========================
   AUDIO PROCESSING
========================= */
function startAudioProcessing(mediaStream) {
  audioContext = new AudioContext({ sampleRate: 48000 });

  const source = audioContext.createMediaStreamSource(mediaStream);
  processor = audioContext.createScriptProcessor(4096, 1, 1);

  source.connect(processor);
  processor.connect(audioContext.destination);

  connectWebSocket();

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const pcm16Buffer = float32ToInt16(input);
    sendAudioChunk(pcm16Buffer);
  };
}

/* =========================
   FLOAT32 → INT16 PCM
========================= */
function float32ToInt16(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);

  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(
      offset,
      sample < 0 ? sample * 0x8000 : sample * 0x7fff,
      true
    );
  }

  return buffer;
}

/* =========================
   WEBSOCKET
========================= */
function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("🔌 WebSocket connected");
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error", err);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket closed");
  };
}

function sendAudioChunk(chunk) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(chunk);
  }
}