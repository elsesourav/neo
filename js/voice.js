let isRandom = false;
async function setMicrophoneAnimationRandom() {
   if (isRandom) {
      const random = linearGen.next(true);
      voiceView.setAttribute("style", `--scale: ${random};--extra: ${1}`);
      await wait(10);
      setMicrophoneAnimationRandom();
   }
}

function setMicrophoneAnimation(value = 0, random = false) {
   if (random) {
      isRandom = true;
      setMicrophoneAnimationRandom();
      return;
   } else {
      isRandom = false;
      if (value > 0)
         voiceView.setAttribute("style", `--scale: ${value};--extra: ${1}`);
      else voiceView.setAttribute("style", `--scale: ${value};--extra: ${0}`);
   }
}

/* ---------------- Text to Speech Converter -------------- */
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

const stopSpeech = () => {
   speechSynthesis.cancel();
};

/* ---------------- Voice Volume Detection -------------- */
let audioContext;
let analyser;
let microphone;
let javascriptNode;
let stream;

function startVolumeDetection() {
   navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((_stream) => {
         stream = _stream;
         audioContext = new AudioContext();
         analyser = audioContext.createAnalyser();
         microphone = audioContext.createMediaStreamSource(_stream);
         javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

         analyser.smoothingTimeConstant = 0.8;
         analyser.fftSize = 1024;

         microphone.connect(analyser);
         analyser.connect(javascriptNode);
         javascriptNode.connect(audioContext.destination);

         javascriptNode.onaudioprocess = function () {
            if (analyser.frequencyBinCount) {
               const array = new Uint8Array(analyser.frequencyBinCount);
               analyser.getByteFrequencyData(array);
               const values = array.reduce((a, b) => a + b);
               const average = Math.round(values / array.length);
               setMicrophoneAnimation(average);
            }
         };
      })
      .catch((err) => {
         console.error("Error accessing microphone:", err);
      });
}

function stopVolumeDetection() {
   if (microphone) {
      microphone.disconnect();
      microphone = null;
   }
   if (analyser) {
      analyser.disconnect();
      analyser = null;
   }
   if (javascriptNode) {
      javascriptNode.disconnect();
      javascriptNode = null;
   }
   if (audioContext) {
      if (audioContext.state !== "closed") {
         audioContext.close().then(() => {
            audioContext = null;
         });
      } else {
         audioContext = null;
      }
   }
   if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
   }
}

/* ---------------- Voice Recognition -------------- */
const SpeechRecognition =
   window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let isRecognitionRunning = false;

recognition.onstart = () => {
   isRecognitionRunning = true;
   if (isMobile) setMicrophoneAnimation(1, true);
   // console.log("start recognition.");
};
recognition.onend = () => {
   isRecognitionRunning = false;
   stopVoiceRecognition();
   // console.log("Voice recognition ended.");
};
recognition.onresult = (event) => {
   for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
         const voiceText = document.getElementById("voice-text");
         voiceText.value += result[0].transcript + ". ";
      }
   }
};

const startVoiceRecognition = () => {
   if (!isRecognitionRunning) {
      stopSpeech();
      if (!isMobile) startVolumeDetection();
      recognition.start();
   }
};
const stopVoiceRecognition = () => {
   recognition.stop();
   stopVolumeDetection();
   setMicrophoneAnimation();
   stopSpeech();
};

recognition.onerror = (event) => {
   console.log("Error occurred in recognition:", event.error);
};
