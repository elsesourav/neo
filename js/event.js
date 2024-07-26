const menuToggle = document.getElementById("toggle-menu");
const navBar = document.querySelector("nav");
const chatSection = document.getElementById("in-out");
const newConversationButton = document.getElementById("new-conversation");
const conversationHistory = document.getElementById("conversation-history");
const outputChat = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const voiceButton = document.getElementById("voice-input");

const tempForRead = document.getElementById("temp-for-read");

const voiceView = document.getElementById("voice-view");
const voiceText = document.getElementById("voice-text");
const voicePlayButton = document.getElementById("voice-play-button");
const voicePauseButton = document.getElementById("voice-pause-button");
const voiceSendButton = document.getElementById("voice-send-button");
const voiceCloseButton = document.getElementById("voice-close-button");

menuToggle.addEventListener("click", () => {
   navBar.classList.toggle("active");
});
chatSection.addEventListener("click", () => {
   navBar.classList.remove("active");
});

newConversationButton.addEventListener("click", () => {
   newConversation();
});
voiceButton.addEventListener("click", () => {
   voiceView.classList.add("active");
   setTimeout(() => {
      startVoiceRecognition();
   }, 500);
});
voicePlayButton.addEventListener("click", () => {
   startVoiceRecognition();
});
voiceCloseButton.addEventListener("click", () => {
   voiceView.classList.remove("active");
   stopVoiceRecognition();
   stopSpeech();
   voiceText.value = "";
});
voicePauseButton.addEventListener("click", () => {
   stopVoiceRecognition();
});
voiceSendButton.addEventListener("click", async () => {
   stopVoiceRecognition();
   messageInput.value = voiceText.value;
   voiceText.value = "";
   const is = await sendConversationFromAI(true);

   if (is) {
      const text = replaceSpecialPairs(tempForRead.value);
      textToSpeech(text);
   }
});

sendButton.addEventListener("click", () => sendConversationFromAI());

let shiftKeyIsDown = false;

addEventListener("keydown", (e) => {
   if (e.keyCode === 16) shiftKeyIsDown = true;
});
addEventListener("keyup", (e) => {
   if (e.keyCode === 16) shiftKeyIsDown = false;
});

messageInput.addEventListener("keypress", (e) => {
   if (!shiftKeyIsDown && e.key === "Enter") {
      sendButton.click();
      e.preventDefault();
   }
});

messageInput.addEventListener("input", ({ target }) => {
   const maxHeight = parseInt(getCssRootValues("--input-h-max").replace("px", ""));
   target.style.height = "min-content";
   const height = target.scrollHeight < maxHeight ? target.scrollHeight : maxHeight;
   target.style.height = `${height}px`;
});
