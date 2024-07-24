function setupChats(id) {
   const conversation = storage[id];
   currentConversationId = id;
   outputChat.innerHTML = "";
   history = conversation.messages;

   for (let message of history) {
      addConversation(message.role, message.parts[0].text);
   }

   document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
   });
}

function newConversation() {
   outputChat.innerHTML = "";
   history = [];
   currentConversationId = createConversationId();
   messageInput.value = "";
}

function addConversation(type, message) {
   const html = converter.makeHtml(message);
   let str;
   if (type === "user") {
      str = `<li class="chat outgoing">
            <div class="message">${html}</div>
      </li>`;
   } else {
      str = `<li class="chat incoming">
            <span><img src="./src/iconSmall.png" alt="icon"></img></span>
            <div class="message">${html}</div>
      </li>`;
   }
   outputChat.innerHTML += str;
   document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
   });
}

function deleteConversation(id) {
   delete storage[id];
   saveLocalStorage();
   setConversationHistory();
   if (id === currentConversationId) {
      newConversation();
   }
}

function setConversationHistory() {
   conversationHistory.innerHTML = "";
   let html = "";
   for (const id in storage) {
      html = 
      `<li>
         <i class="sbi-grid-view"></i>
         <span id="span-${id}" onclick="setupChats(${id})"></span>
         <i class="sbi-delete-forever" onclick="deleteConversation(${id})"></i>
      </li>` + html;
   }
   conversationHistory.innerHTML = html;
   for (const id in storage) {
      const text = storage[id].messages[1].parts[0].text.trim();
      const subText = text.length > 18 ? text.substring(0, 18) + "..." : text;
      const spanIds = document.getElementById(`span-${id}`);
      spanIds.textContent = subText;
   }
   
}


let storageOldData = getLocalStorage();
if (storageOldData) {
   storage = storageOldData;
   setConversationHistory();
}
 
async function sendConversationFromAI() {
   const is = storage[currentConversationId];

   const inputText = messageInput.value.trim();
   messageInput.value = "";
   if (inputText !== "") {
      addConversation("user", inputText);
      const text = await getResponse(inputText);
      addConversation("model", text);

      // save storage
      storage[currentConversationId] = {
         messages: history
      }
      saveLocalStorage();
   }

   if (!is) {
      setConversationHistory();
   }
}

newConversation();