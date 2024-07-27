function setupChats(id) {
   const conversation = storage[id];
   currentConversationId = id;
   outputChat.innerHTML = "";
   history = conversation.messages;

   for (let message of history) {
      addConversation(message.role, message.parts[0].text, false);
   }

   chatScrollBottom();
}

function chatScrollBottom() {
   chatSection.scrollTop = chatSection.scrollHeight;
}

function sendSuggestionMessage(question) {
   outputChat.innerHTML = "";
   messageInput.value = question;
   sendConversationFromAI();
}

function addSuggestions() {
   let str = "";
   let i = 0;
   for (const key in questions) {
      const category = questions[key];
      const icon = questionIcons[i++];
      const question = category[Math.floor(Math.random() * category.length)];
      
      str = `
         <div class="content" onclick="sendSuggestionMessage('${question}')">
            <p>${question}</p>
            <i class="${icon}"></i>
         </div>
      ` + str;
   }
   setTimeout(() => {
      if(!outputChat.innerHTML) {
         outputChat.innerHTML = `<div class="suggestions">${str}</div>`;
      }
   }, 3000);
}

function newConversation() {
   outputChat.innerHTML = "";
   addSuggestions();
   history = [];
   currentConversationId = createConversationId();
   messageInput.value = "";
}

async function addConversation(type, message, animation = true) {
   const html = converter.makeHtml(message);
   const id = Date.now();

   let str;
   if (type === "user") {
      str = `<li class="chat outgoing">
      <div class="message">${message}</div>
      </li>`;
   } else {
      str = `<li class="chat incoming">
            <span><img src="./src/iconSmall.png" alt="icon"></span>
            <div class="message" id="message-${id}"></div>
      </li>`;
   }
   outputChat.innerHTML += str;

   // make typing animations
   if (type !== "user") {
      const lastElement = document.getElementById(`message-${id}`);
      lastElement.innerHTML = html;
      tempForRead.value = lastElement.textContent;

      lastElement.querySelectorAll("pre code").forEach((block) => {
         hljs.highlightBlock(block);
         block.innerHTML += `<div class="sbi-content-copy copy" onclick="copyTextToClipboard(this)"></div>`;
      });

      if (animation) {
         const newHtml = lastElement.innerHTML;
         lastElement.innerHTML = "";
         await typeHtml(lastElement, newHtml, 5, chatScrollBottom);
      }
   }
   chatScrollBottom();
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
         <i class="sbi-chat"></i>
         <span id="span-${id}" onclick="setupChats(${id})"></span>
         <i class="sbi-delete-forever" onclick="deleteConversation(${id})"></i>
      </li>` + html;
   }
   conversationHistory.innerHTML = html;
   for (const id in storage) {
      const text = storage[id].messages[0].parts[0].text.trim();
      const subText = text.length > 25 ? text.substring(0, 23) + "..." : text;
      const spanIds = document.getElementById(`span-${id}`);
      spanIds.textContent = subText;
   }
}

let storageOldData = getLocalStorage();
if (storageOldData) {
   storage = storageOldData;
   setConversationHistory();
}

async function sendConversationFromAI(inVoice = false) {
   const is = storage[currentConversationId];

   const inputText = messageInput.value.trim();
   messageInput.value = "";
   messageInput.style.height = "min-content";
   if (inputText !== "") {
      addConversation("user", inputText);
      const text = await getResponse(inputText, inVoice);
      addConversation("model", text);

      // save storage
      storage[currentConversationId] = {
         messages: history,
      };
      saveLocalStorage();
   }

   if (!is) setConversationHistory();

   return true;
}

newConversation();
