🧠 NotePilot – Real-Time AI Meeting Assistant
📌 Overview

NotePilot is a real-time AI meeting assistant that works seamlessly with platforms like Google Meet.

It captures live meeting audio (with user consent), processes it instantly, and converts conversations into actionable insights such as:

📝 Live transcripts
📊 Summaries
✅ Action items
📈 Meeting intelligence

Unlike traditional tools, NotePilot does not just record meetings — it understands them in real time.

🚩 Problem Statement

Modern online meetings face several challenges:

Late joiners miss important context
Frequent interruptions like “What did I miss?”
No clear tracking of decisions or action items
Manual effort required for Minutes of Meeting (MOM)
Lack of accountability and engagement tracking

👉 Result: Meetings consume time but fail to deliver clarity.

💡 Solution

NotePilot acts as a real-time AI copilot that:

🎙️ Captures live meeting audio directly from the browser
🔄 Transcribes conversations continuously
⚡ Helps late joiners instantly catch up
🧾 Builds the foundation for automated summaries and insights

All of this runs silently in the background without disrupting participants.

🧠 Core Idea

Meetings should not just be recorded — they should be understood.

NotePilot transforms raw meeting audio into:

Structured
Searchable
Actionable intelligence
🏗️ Architecture
Google Meet
   ↓
Chrome Extension (Tab Audio Capture)
   ↓
Web Audio API (PCM Processing)
   ↓
WebSocket Streaming
   ↓
Local Backend Server
   ↓
Whisper (Speech-to-Text)
   ↓
Live Transcript
🎯 Features Implemented
✅ Chrome Extension (Manifest V3)
Works only on Google Meet
Requires explicit user permission
Fully compliant with Chrome security policies
✅ Real-Time Audio Capture
Uses chrome.tabCapture.capture()
Active tab only (privacy-safe)
Start/Stop controlled by user
✅ Popup-Based Capture Architecture
Implemented via extension popup due to MV3 limitations
Ensures compliance with Chrome policies
✅ Real-Time Audio Processing
Web Audio API for processing
Converts audio → 16-bit PCM
Streams small chunks via WebSockets
✅ Backend WebSocket Server
Receives real-time audio
Buffers and prepares for transcription
Fully decoupled from frontend
✅ Whisper Integration (Offline AI)
No API keys required
No cloud billing
Runs locally
High accuracy transcription
✅ FFmpeg Integration
Ensures audio compatibility
Required for Whisper
Configured for Windows
✅ Live Transcription (End-to-End)
Real-time Google Meet transcription
Instant context for late joiners
Fully working pipeline
🧱 Project Structure
NotePilot/
│
├── backend/
│   ├── whisper_server.py
│   ├── server.js (unused)
│   ├── package.json
│   └── node_modules/
│
├── NotePilot-Extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
│
└── README.md
🧾 Key Files
🔹 manifest.json
Manifest V3
Minimal permissions (tabCapture)
Restricted to Google Meet
🔹 popup.js
Captures tab audio
Processes via Web Audio API
Streams via WebSockets
🔹 whisper_server.py
WebSocket server
Buffers audio
Converts speech → text
🔐 Privacy & Security
✅ User consent required
✅ Only active tab access
❌ No background recording
❌ No system-wide audio capture
✅ Fully compliant with Chrome policies
🧠 Challenges Solved
Chrome MV3 audio limitations
Real-time audio streaming
PCM conversion
Offline speech-to-text
Whisper + FFmpeg setup
End-to-end pipeline stability
🏁 Current Status
Feature	Status
Chrome Extension	✅ Done
Audio Capture	✅ Done
Real-Time Streaming	✅ Done
Backend Server	✅ Done
Whisper Integration	✅ Done
Live Transcription	✅ Done
Summaries & MOM	⏳ Next
Chatbot	⏳ Next
🚀 Future Enhancements
⏱️ Timestamped transcripts
🧾 Automatic MOM generation
🤖 “What did I miss?” chatbot
📌 Action item extraction
📊 Engagement analytics
☁️ Cloud deployment
---

## 🧠 Core Idea

> Meetings should not just be recorded — they should be **understood**.

NotePilot converts raw meeting audio into structured, searchable, and actionable meeting intelligence in real time.

---

## 🏗️ High-Level Architecture

Google Meet  
→ Chrome Extension (Tab Audio Capture)  
→ Web Audio API (PCM Audio Processing)  
→ WebSocket Streaming  
→ Local Backend Server  
→ Whisper (Local Speech-to-Text)  
→ Live Transcript  

---

## 🎯 What We Have Built So Far

### ✅ Chrome Extension (Manifest V3)

We built a **Manifest V3–compliant Chrome extension** that:

- Works only on Google Meet
- Requires explicit user interaction
- Complies with Chrome’s latest security and privacy policies
- Does not record system-wide or background audio

---

### ✅ Real-Time Google Meet Audio Capture

The extension captures **live Google Meet tab audio** using:

- `chrome.tabCapture.capture()`
- User-triggered Start/Stop controls
- Active-tab-only enforcement (Chrome security model)

This ensures privacy-safe, permission-based audio access.

---

### ✅ Popup-Based Capture Architecture

Due to Chrome MV3 limitations, audio capture is implemented inside the **extension popup**.

**Why popup-based capture?**
- `tabCapture` is not available in service workers
- `tabCapture` is not supported in offscreen documents
- Extension pages (popup) are the only valid capture surface

This makes the architecture **policy-compliant and production-safe**.

---

### ✅ Real-Time Audio Processing & Streaming

Once captured, meeting audio is:

- Processed using the **Web Audio API**
- Converted into **16-bit PCM format**
- Broken into small time-based chunks
- Streamed continuously via **WebSockets**

This enables low-latency, real-time processing instead of large recordings.

---

### ✅ Backend WebSocket Server

We implemented a **local backend server** that:

- Listens for real-time audio streams over WebSockets
- Buffers incoming PCM audio in short windows
- Prepares audio for speech-to-text processing

This backend is decoupled from the browser, allowing future scalability.

---

### ✅ Speech-to-Text with Whisper (No Billing)

To avoid cloud billing and API dependencies, we integrated **OpenAI Whisper (open-source, local model)**.

Key benefits:
- No API keys required
- No credit/debit card required
- No cloud dependency
- Works completely offline
- High transcription accuracy

Whisper converts buffered audio into text in near real time.

---

### ✅ FFmpeg Integration (Windows Compatibility)

Whisper relies on **FFmpeg** for audio decoding.

We:
- Installed FFmpeg locally
- Added it to the system PATH
- Enabled stable Whisper execution on Windows

This resolved all platform-level audio processing issues.

---

### ✅ Live Transcription (End-to-End)

The system now supports:

- Live Google Meet audio capture
- Real-time audio streaming
- Continuous speech-to-text transcription during meetings

Late joiners can immediately understand:
- What has already been discussed
- The direction of the meeting

---

## 🧱 Current Project Structure
NotePilot/
├── backend/
│ ├── whisper_server.py # Whisper WebSocket backend
│ ├── server.js # Old Google STT backend (unused)
│ ├── package.json
│ └── node_modules/
│
├── NotePilot-Extension/
│ ├── manifest.json
│ ├── popup.html
│ ├── popup.js # Audio capture + WebSocket streaming
│ └── icons/
│
└── README.md


---

## 🧾 Key Files Explained

### `manifest.json`
- Uses Manifest Version 3
- Requests minimal permissions (`tabCapture`)
- Restricts host access to `https://meet.google.com/*`

---

### `popup.js`
- Captures live tab audio
- Uses Web Audio API for processing
- Converts audio to PCM format
- Streams audio chunks via WebSockets

This is the **core real-time capture and streaming layer**.

---

### `whisper_server.py`
- Python-based WebSocket server
- Buffers incoming audio
- Uses Whisper for speech-to-text
- Outputs live transcripts

This file is the **AI intelligence backbone** of NotePilot.

---

## 🔐 Privacy & Security

- Audio capture starts only after explicit user action
- Only the active Google Meet tab is accessed
- No system-wide audio recording
- No background or silent recording
- Fully compliant with Chrome Manifest V3 policies

---

## 🧠 Technical Challenges Solved

- Chrome MV3 audio capture limitations
- Real-time WebSocket audio streaming
- PCM audio conversion
- Local speech-to-text without cloud billing
- Windows Whisper + FFmpeg integration
- Stable end-to-end real-time transcription

---

## 🏁 Current Status

| Feature | Status |
|------|------|
Chrome Extension (MV3) | ✅ Completed |
Google Meet Audio Capture | ✅ Completed |
Real-Time Audio Streaming | ✅ Completed |
Backend WebSocket Server | ✅ Completed |
Whisper Speech-to-Text | ✅ Completed |
Live Transcription | ✅ Completed |
Summaries & MOM | ⏳ Next Step |
Chatbot & Evaluation | ⏳ Next Step |

---

## 🚀 Next Phase (Planned)

Planned enhancements include:

1. Timestamped transcript chunks  
2. Automatic Minutes of Meeting (MOM)  
3. “What did I miss?” conversational chatbot  
4. Action item and deadline extraction  
5. Meeting participation and engagement analysis  
6. Optional cloud deployment for scalability  

---

## 🏆 Hackathon Pitch Line

**“NotePilot doesn’t just record meetings — it understands them in real time.”**

---

## 👥 Team

Built by a team of four as a hackathon project, focused on:
- Productivity
- Clarity
- Real-time intelligence
- Practical, privacy-first engineering

---

## 📌 Current Highlight

✔ Real Google Meet audio capture  
✔ Live transcription  
✔ No cloud billing  
✔ Fully working end-to-end pipeline  
✔ Hackathon-ready demo  


C:\Users\Lenovo\Documents\NotePilot\backend>python whisper_server.py

#LINK TO OPEN PREVIEW:
[https://notepilot-demo.preview.emergentagent.com](https://notepilot-demo.preview.emergentagent.com/)
