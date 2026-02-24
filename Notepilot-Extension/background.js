async function ensureOffscreen() {
  const exists = await chrome.offscreen.hasDocument();
  if (!exists) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["USER_MEDIA"], // 🔥 THIS IS THE FIX
      justification: "Capture Google Meet tab audio"
    });
  }
}
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_CAPTURE") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (!tab) {
        sendResponse({ success: false });
        return;
      }

      await ensureOffscreen();

      // 🔥 NOTICE: NO tabCapture here
      chrome.runtime.sendMessage(
        { type: "START_CAPTURE", tabId: tab.id },
        sendResponse
      );
    });

    return true;
  }

  if (msg.type === "STOP_CAPTURE") {
    chrome.runtime.sendMessage({ type: "STOP_CAPTURE" }, sendResponse);
    return true;
  }
});