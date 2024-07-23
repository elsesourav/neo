function appendMessage(sender, text) {
   console.log(sender, text);

   // element . scrollTop = element . scrollHeight;
}

async function getResponse(prompt) {
   const options = {
      method: "POST",
      headers: {
         Authorization: `Bearer ${GPT_API_KEY}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: prompt }],
         max_tokens: 200,
      }),
   };

   const response = await fetch("https://api.openai.com/v1/chat/completions", options);

   const data = await response.json();
   return data.choices[0].text.trim();
}

const sendRequest = async (message = "hello") => {
   // const userMessage = userInput.value.trim();

   // if (userMessage) {
   appendMessage("user", message);
   // userInput.value = "";

   const botResponse = await getResponse(message);
   appendMessage("bot", botResponse);
   // }
};

sendButton.addEventListener("click", () => {
   sendRequest();
});

// userInput.addEventListener("keypress", (e) => {
//    if (e.key === "Enter") {
//       sendBtn.click();
//    }
// });
