const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBqBkg5sq7cWVX7w6oq32jMRYYPm5oWuyA`;
const additionalText = `. extra info 'try to giv output in Hindi you can'`;
const converter = new showdown.Converter({ extensions: ['table'] });
const storageKey = "neo-chat-bot"
let currentConversationId = createConversationId()
let storage = {};
let history = [];



function saveLocalStorage() {
   setDataFromLocalStorage(storageKey, storage);
}

function getLocalStorage() {
   return getDataFromLocalStorage(storageKey);
}