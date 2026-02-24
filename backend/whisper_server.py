import asyncio
import websockets
import whisper
import numpy as np
import soundfile as sf
import tempfile
import os

print("🧠 Loading Whisper model...")
model = whisper.load_model("base")
print("✅ Whisper model loaded")

AUDIO_RATE = 48000
BUFFER_SECONDS = 5
audio_buffer = []

async def handler(websocket):
    global audio_buffer
    print("🎧 Client connected")

    async for message in websocket:
        pcm = np.frombuffer(message, dtype=np.int16)
        audio_buffer.append(pcm)

        total_samples = sum(len(chunk) for chunk in audio_buffer)

        if total_samples >= AUDIO_RATE * BUFFER_SECONDS:
            audio_data = np.concatenate(audio_buffer)
            audio_buffer = []

            audio_float = audio_data.astype(np.float32) / 32768.0

            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as f:
                sf.write(f.name, audio_float, AUDIO_RATE)
                temp_path = f.name

            print("🧠 Transcribing...")
            result = model.transcribe(temp_path, language="en")
            text = result["text"].strip()

            if text:
                print("📝 Transcript:", text)

            os.remove(temp_path)

async def main():
    async with websockets.serve(handler, "localhost", 8080):
        print("🚀 Whisper WebSocket server running on ws://localhost:8080")
        await asyncio.Future()

asyncio.run(main())