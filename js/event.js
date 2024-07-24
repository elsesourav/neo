const menuToggle = document.getElementById("toggle-menu");
const navBar = document.querySelector("nav");
const chatSection = document.getElementById("in-out");

menuToggle.addEventListener("click", () => {
   navBar.classList.toggle("active");
});
chatSection.addEventListener("click", () => {
   navBar.classList.remove("active");
});


const newConversationButton = document.getElementById("new-conversation");
const conversationHistory = document.getElementById("conversation-history");
const outputChat = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const voiceButton = document.getElementById("voice-input");

sendButton.addEventListener("click", async () => {
   const inputText = messageInput.value.trim();
   if (inputText !== "") {
      addConversation("user", inputText);
      messageInput.value = "";
      const text = await getResponse(inputText);
      addConversation("model", text);

      // save storage
      storage[currentConversationId] = {
         messages: history
      }
      saveLocalStorage();
   }
});