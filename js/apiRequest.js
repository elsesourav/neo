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

      history.push({ role: 'model', parts: [{ text: aiMessage }] });
      return aiMessage;
   } catch (error) {
      console.error("Error:", error);
   }
}


