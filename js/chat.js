const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBqBkg5sq7cWVX7w6oq32jMRYYPm5oWuyA`;

async function getResponse(prompt = "hello") {
   try {
      const response = await fetch(aiUrl, {
         method: "POST",
         body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
         }),
      });
      const modelResponse = await response.json();

      appendMessage("model", modelResponse);
   } catch (error) {
      console.error("Error:", error);
   }
}

function appendMessage(sender, text) {
   console.log(sender, text);

   // element . scrollTop = element . scrollHeight;
}

const sendRequest = async (message = "hi their") => {
   // const userMessage = userInput.value.trim();
   // if (userMessage) {
   // appendMessage("user", message);
   // // userInput.value = "";
   // const botResponse = await getResponse(message);
   // appendMessage("bot", botResponse);
   // }
};

sendButton.addEventListener("click", () => {
   getResponse();
});

// userInput.addEventListener("keypress", (e) => {
//    if (e.key === "Enter") {
//       sendBtn.click();
//    }
// });
