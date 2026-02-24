const WebSocket = require("ws");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient();

const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 WebSocket server running on ws://localhost:8080");

wss.on("connection", async (ws) => {
  console.log("🎧 Client connected");

  let recognizeStream = client
    .streamingRecognize({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 48000, // MUST match frontend
        languageCode: "en-US",
        enableAutomaticPunctuation: true
      },
      interimResults: true
    })
    .on("data", (data) => {
      if (data.results[0] && data.results[0].alternatives[0]) {
        console.log(
          "📝 Transcript:",
          data.results[0].alternatives[0].transcript
        );
      }
    })
    .on("error", (err) => {
      console.error("❌ STT Error:", err);
    });

  ws.on("message", (audioChunk) => {
    // audioChunk is already raw PCM
    recognizeStream.write(audioChunk);
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
    recognizeStream.end();
  });
});