const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBqBkg5sq7cWVX7w6oq32jMRYYPm5oWuyA`;

const history = [];

async function getResponse(prompt = "hello") {
   history.push({ role: 'user', parts: [{ text: prompt }] });
   try {
      const response = await fetch(aiUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            contents: history,
         }),
      });
      const modelResponse = await response.json();
      const aiMessage = modelResponse.candidates[0].content.parts[0].text;

      appendMessage("model", aiMessage);

      history.push({ role: 'model', parts: [{ text: aiMessage }] });
   } catch (error) {
      console.error("Error:", error);
   }
}

function appendMessage(sender, text) {
   console.log(sender, text);

   // element . scrollTop = element . scrollHeight;
}

// sendButton.addEventListener("click", () => {
//    getResponse();
// });

// userInput.addEventListener("keypress", (e) => {
//    if (e.key === "Enter") {
//       sendBtn.click();
//    }
// });

