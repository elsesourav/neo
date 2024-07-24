const menuToggle = document.getElementById("toggle-menu");
const navBar = document.querySelector("nav");
const chatSection = document.getElementById("in-out");
const newConversationButton = document.getElementById("new-conversation");
const conversationHistory = document.getElementById("conversation-history");
const outputChat = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const voiceButton = document.getElementById("voice-input");


menuToggle.addEventListener("click", () => {
   navBar.classList.toggle("active");
});
chatSection.addEventListener("click", () => {
   navBar.classList.remove("active");
});

newConversationButton.addEventListener("click", () => {
   newConversation();
});


sendButton.addEventListener("click", () => sendConversationFromAI());

let shiftKeyIsDown = false;

addEventListener("keydown", (e) => {
   if (e.keyCode === 16) shiftKeyIsDown = true;
})
addEventListener("keyup", (e) => {
   if (e.keyCode === 16) shiftKeyIsDown = false;
})

messageInput.addEventListener("keypress", (e) => {
   if (!shiftKeyIsDown && e.key === "Enter") {
      sendButton.click();
      e.preventDefault();
   }
});