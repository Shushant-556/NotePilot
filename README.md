# 🧠 NotePilot – Real-Time AI Meeting Assistant

## 📌 Overview
**NotePilot** is a real-time AI meeting assistant designed to work seamlessly with platforms like Google Meet.  

It captures live meeting audio (with explicit user consent), processes it instantly, and converts conversations into **actionable meeting intelligence** such as:
- 📝 Live transcripts  
- 📊 Summaries  
- ✅ Action items  
- 📈 Meeting insights  

Unlike traditional tools, NotePilot **does not just record meetings — it understands them in real time.**

---

## 📸 Demo

### 🔹 Application Interface
<img src="images/app.png" width="800"/>

### 🔹 Live Transcription
<img src="images/transcript.png" width="800"/>

> 📁 Place your images inside a folder named `images` in your repository.

---

## 🚩 Problem Statement
Modern online meetings suffer from:

- Participants joining late and missing context  
- Interruptions like *“What did I miss?”*  
- No clear tracking of decisions and action items  
- Manual creation of Minutes of Meeting (MOM)  
- Lack of ownership and deadlines  
- Poor engagement tracking  

👉 Result: Meetings consume time but fail to create clarity or accountability.

---

## 💡 Solution
NotePilot acts as a **real-time AI copilot** that:

- 🎙️ Captures live meeting audio from the browser  
- 🔄 Transcribes conversations continuously  
- ⚡ Helps late joiners instantly understand context  
- 🧾 Enables automatic summaries and insights  

All of this happens **silently in the background** without interrupting participants.

---

## 🧠 Core Idea
> **Meetings should not just be recorded — they should be understood.**

NotePilot transforms raw audio into:
- Structured  
- Searchable  
- Actionable intelligence  

---

## 🏗️ Architecture

```
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
```

---

## 🎯 Features Implemented

### ✅ Chrome Extension (Manifest V3)
- Works only on Google Meet  
- Requires explicit user interaction  
- Fully compliant with Chrome policies  

### ✅ Real-Time Audio Capture
- Uses `chrome.tabCapture.capture()`  
- Active-tab-only enforcement  
- User-controlled Start/Stop  

### ✅ Popup-Based Capture Architecture
- Implemented in popup due to MV3 limitations  
- Ensures compliance and stability  

### ✅ Real-Time Audio Processing
- Uses Web Audio API  
- Converts audio → 16-bit PCM  
- Streams small chunks via WebSockets  

### ✅ Backend WebSocket Server
- Receives real-time audio  
- Buffers and processes audio  
- Prepares data for transcription  

### ✅ Whisper Integration (Offline AI)
- No API key required  
- No cloud dependency  
- Runs locally  
- High accuracy  

### ✅ FFmpeg Integration
- Required for Whisper  
- Configured for Windows compatibility  

### ✅ Live Transcription (End-to-End)
- Real-time transcription  
- Fully working pipeline  
- Helps late joiners catch up instantly  

---

## 🧱 Project Structure

```
NotePilot/
│
├── backend/
│   ├── whisper_server.py
│   ├── server.js
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
```

---

## 🧾 Key Files

### 🔹 manifest.json
- Manifest Version 3  
- Minimal permissions (`tabCapture`)  
- Restricted to Google Meet  

### 🔹 popup.js
- Captures live tab audio  
- Processes via Web Audio API  
- Streams via WebSockets  

### 🔹 whisper_server.py
- Python WebSocket server  
- Buffers audio  
- Converts speech → text  

---

## 🔐 Privacy & Security

- ✅ User consent required  
- ✅ Only active tab access  
- ❌ No background recording  
- ❌ No system-wide audio capture  
- ✅ Fully compliant with Chrome policies  

---

## 🧠 Challenges Solved

- Chrome MV3 audio capture limitations  
- Real-time WebSocket streaming  
- PCM audio conversion  
- Offline speech-to-text (Whisper)  
- FFmpeg setup and integration  
- Stable end-to-end pipeline  

---

## 🏁 Current Status

| Feature | Status |
|--------|--------|
| Chrome Extension | ✅ Completed |
| Audio Capture | ✅ Completed |
| Real-Time Streaming | ✅ Completed |
| Backend Server | ✅ Completed |
| Whisper Integration | ✅ Completed |
| Live Transcription | ✅ Completed |
| Summaries & MOM | ⏳ Next |
| Chatbot | ⏳ Next |

---

## 🚀 Future Enhancements

- ⏱️ Timestamped transcripts  
- 🧾 Automatic MOM generation  
- 🤖 “What did I miss?” chatbot  
- 📌 Action item extraction  
- 📊 Engagement analytics  
- ☁️ Cloud deployment  

---

## 🏆 Hackathon Pitch

> **“NotePilot doesn’t just record meetings — it understands them in real time.”**

---

## 📌 Live Demo

🔗 https://notepilot-demo.preview.emergentagent.com

---

## ⚙️ How to Run

```bash
cd backend
python whisper_server.py
```

---
