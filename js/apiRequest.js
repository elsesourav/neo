async function getResponse(prompt, isVoice = false) {
   const newPrompt = isVoice ? prompt + additionalText : prompt;
   history.push({ role: 'user', parts: [{ text: newPrompt }] });

   
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
      
      history[history.length - 1] = { role: 'user', parts: [{ text: prompt }] };
      history.push({ role: 'model', parts: [{ text: aiMessage }] });
      return aiMessage;
   } catch (error) {
      console.dir(error)
   }
}


