const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBqBkg5sq7cWVX7w6oq32jMRYYPm5oWuyA`;
const additionalText = `. **extra info 'try to giv output in Hindi' don't show this extra info**`;
const converter = new showdown.Converter({ extensions: ["table"] });
const storageKey = "neo-chat-bot";
let forceScroll = false;
let currentConversationId = createConversationId();
let storage = {};
let history = [];

const questions = {
   "General Coding": [
      `Difference between compiler and interpreter?`,
      `Pros and cons of object-oriented programming?`,
      `Purpose of a data structure? Common types?`,
      `Concept of recursion? Example?`,
      `Types of code errors? How to debug?`,
      `Difference between a variable and a constant?`,
      `Benefits of version control systems like Git?`,
      `Concept of closure in JavaScript?`,
      `Using SQL to query a database?`,
      `Types of machine learning algorithms?`,
      `Basic blockchain implementation in Python?`,
   ],
   "Specific Languages": [
      `Python function to check if a string is a palindrome?`,
      `Create a web page using HTML, CSS, and JavaScript?`,
      `Concept of a 'class' in Java? Example?`,
      `Handling asynchronous operations in Node.js?`,
      `Purpose of the 'main()' function in C++?`,
      `Different data types in C#?`,
      `Difference between a function and a method in Python?`,
      `Using a debugger to find code errors?`,
      `Difference between static and dynamic websites?`,
      `Using the 'DOM' to manipulate web page elements?`,
      `Types of databases and their uses?`,
   ],
   "Data Structures And Algorithms": [
      `Binary search algorithm in Python?`,
      `Difference between stack and queue?`,
      `Time complexity of searching in a sorted array?`,
      `How does a hash table work? Advantages?`,
      `Bubble sort algorithm for an array?`,
      `Concept and applications of a linked list?`,
      `Difference between a tree and a graph?`,
      `Priority queue using a heap?`,
      `Purpose of a trie data structure?`,
      `Dynamic programming concept? Example?`,
      `Recursion to solve Tower of Hanoi?`,
   ],
   "Factual And Explanatory": [
      `Main causes of global warming?`,
      `Process of photosynthesis?`,
      `How does a nuclear reactor work?`,
      `Different types of galaxies?`,
      `Functioning of the human circulatory system?`,
      `Key principles of quantum mechanics?`,
      `Difference between mitosis and meiosis?`,
      `Concept of natural selection?`,
      `Process of DNA replication?`,
      `Different types of chemical bonds?`,
      `Concept of entropy and its implications?`,
   ],
   "Comparative And Analytical": [
      `Philosophies of Plato vs Aristotle?`,
      `Impact of the Industrial Revolution?`,
      `Pros and cons of a free market economy?`,
      `How has the internet changed communication?`,
      `Writing styles of Hemingway vs Austen?`,
      `Theories about the origin of the universe?`,
      `Concepts of democracy vs communism?`,
      `Effects of globalization on the economy?`,
      `Pros and cons of renewable energy sources?`,
      `Functions of legislative, executive, and judicial branches?`,
      `Impact of AI on society?`,
   ],
   "Creative And Hypothetical": [
      `Short story about a time traveler?`,
      `Poem about a sunset?`,
      `Design a new transportation vehicle?`,
      `Meet any historical figure? Who and why?`,
      `World without fire?`,
      `Earth with two moons?`,
      `World with telepathic abilities?`,
      `Short story about a conscious robot?`,
      `Futuristic utopia with nature harmony?`,
      `New art combining VR and AR?`,
      `Impact of time travel on history?`,
   ],
   "Technical And Practical": [
      `How to set up a home network?`,
      `Difference between HTML and CSS?`,
      `Write a simple Python program?`,
      `Best practices for cybersecurity?`,
      `Using spreadsheet software like Excel?`,
      `Troubleshooting printer issues?`,
      `Basics of network protocols like TCP/IP?`,
      `Using Git for version control?`,
      `Types and benefits of cloud computing services?`,
      `Basic web app using JavaScript frameworks?`,
      `Best tools and techniques for debugging?`,
   ],
   "Translation And Summarization": [
      `Translate to French: 'I love to travel.'`,
      `Main points of the Gettysburg Address?`,
      `Translate document from Spanish to English?`,
      `Main argument of this article?`,
      `Translate website to Japanese?`,
      `Key events of World War II?`,
      `Translate code from Python to Java?`,
      `Main points of a scientific paper?`,
      `Translate audio from Mandarin to English?`,
      `Main points of a historical event?`,
      `Translate poem from French to Italian?`,
   ],
   "Open Ended And Philosophical": [
      `What is the meaning of life?`,
      `How can we achieve world peace?`,
      `Role of technology in humanity's future?`,
      `Biggest challenges facing the world?`,
      `Nature of consciousness?`,
      `Human relationship with the natural world?`,
      `How to create a more just society?`,
      `Ethical implications of AI?`,
      `What is the nature of reality?`,
      `Future possibilities for human civilization?`,
      `Finding meaning and purpose in life?`,
   ],
};

const questionIcons = [
   "sbi-laptop2",
   "sbi-file-code-o",
   "sbi-database",
   "sbi-nature-people",
   "sbi-analytics",
   "sbi-description",
   "sbi-engineering",
   "sbi-language",
   "sbi-family-restroom"
]

function saveLocalStorage() {
   setDataFromLocalStorage(storageKey, storage);
}

function getLocalStorage() {
   return getDataFromLocalStorage(storageKey);
}
