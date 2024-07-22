const speak = (text = "") => {
   return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices[15];
      speechSynthesis.speak(utterance);
      utterance.onend = () => resolve();
   })
};

speak("");

const callMe = async () => {
   const out = await speak("hi Friends!");
   console.log(out);
}