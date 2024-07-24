function setupChats(id) {
   const conversation = storage[id];
   console.log(conversation);

   outputChat.innerHTML = "";
   history = conversation.messages;
   currentConversationId = conversation.id;

   for (let message of history) {
      const html = converter.makeHtml(message.parts[0].text);
      addConversation(message.role, html);
   }
}

function newConversation() {
   outputChat.innerHTML = "";
   history = [];
   currentConversationId = createConversationId();
   messageInput.value = "";
}

function addConversation(type, message) {
   let str;
   // const converter = new showdown.Converter();
   // const html = converter.makeHtml(message);
   if (type === "user") {
      str = 
      `<li class="chat outgoing">
            <div class="message">${message}</div>
      </li>`
   } else {
      str = 
      `<li class="chat incoming">
            <span><img src="./src/iconSmall.png" alt="icon"></img></span>
            <div class="message">${message}</div>
      </li>`
   }
   outputChat.innerHTML += str;
}

// setupChats(1721753562842)










