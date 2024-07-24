const textToSpeech = (text = "") => {
   return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      utterance.onend = () => resolve();
   });
};

const makeVoice = async (text) => {
   const out = await textToSpeech(text);
   console.log(out);
};

const SpeechRecognition =
   window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.onstart = () => {
   console.log(
      "start recognition."
   );
};

recognition.onend = () => {
   console.log("Voice recognition ended.");
};

recognition.onresult = (event) => {
   let interimTranscript = "";
   let finalTranscript = "";

   for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
         finalTranscript += result[0].transcript;
      } else {
         interimTranscript += result[0].transcript;
      }
   }
   const voiceText = document.getElementById("voice-text");
   voiceText.innerText += finalTranscript + ". ";
};

recognition.onerror = (event) => {
   console.error("Error occurred in recognition:", event.error);
};

function voiceToText() {

   // recognition.start();
   // recognition.stop();
}
