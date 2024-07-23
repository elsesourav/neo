const textToSpeech = (text = "") => {
   return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.volume = 1;
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
      utterance.onend = () => resolve();
   });
};

const makeVoice = async (text) => {
   const out = await textToSpeech(text);
   console.log(out);
};



