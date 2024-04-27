import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getDatabase, ref as dbRef, set, onValue } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyB968fFd0rn8rxgX4WTMiRY-5I7ZmP783A";
const genAI = new GoogleGenerativeAI(API_KEY);
let dot = document.getElementById("DOT")
let line = document.getElementById("LINE")
let space = document.getElementById("SPACE")
let done = document.getElementById("DONE")
let text = document.getElementById("text")
let next = document.getElementById("NEXT")
let currentCodee = document.getElementById("currentCode")
let aud = document.getElementById("AUDIO")
let repeat = document.getElementById("REPEAT")
let words = ""
async function run(prompt) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContentStream(prompt);
  const response = await result.response;
  const text = response.text();
  words = text.split(" ");
  console.log(text);
}



let currentIndex = 0
function playNextWord() {
    if (currentIndex < words.length) {
        const msg = new SpeechSynthesisUtterance(words[currentIndex]);
        window.speechSynthesis.speak(msg);

        currentIndex++;
    } else {
        currentIndex = 0
        console.log("All words have been spoken.");
    }
}
function repeatLastWord() {
    if (currentIndex < words.length) {
        const msg = new SpeechSynthesisUtterance(words[currentIndex - 1]);
        window.speechSynthesis.speak(msg);

    } else {
        currentIndex = 0
        console.log("All words have been spoken.");
    }
}

aud.addEventListener("click", playNextWord);
repeat.addEventListener("click", repeatLastWord);
const firebaseConfig = {
    apiKey: "AIzaSyD58mivfUeYefkEimNO94G9j7VgSnSlXJU",
    authDomain: "morsecode-69559.firebaseapp.com",
    databaseURL: "https://morsecode-69559-default-rtdb.firebaseio.com",
    projectId: "morsecode-69559",
    storageBucket: "morsecode-69559.appspot.com",
    messagingSenderId: "472468964936",
    appId: "1:472468964936:web:5e7ce16d6346b2b6abba7d"
  };

initializeApp(firebaseConfig);

const db = getDatabase();
const textRef = dbRef(db, "morseText");
let currentText = ""
onValue(textRef, (snapshot) => {
    const storedText = snapshot.val(); // Get the value from the snapshot
    console.log("Stored text:", storedText);
    text.innerText = storedText
});



let currentCode = ""

dot.addEventListener("click", () => {
    currentCode += ".";
    currentCodee.innerText += "."
    console.log(currentCode);
});
line.addEventListener("click", () =>{

    currentCode += "-"
    currentCodee.innerText += "-"

    console.log(currentCode)
})

space.addEventListener("click", () => {
    currentText += " ";
    set(textRef, currentText)
    currentCodee.innerText += "/"

    console.log(currentCode);
});

next.addEventListener("click", () =>{
    currentText += translateMorseToText(currentCode)
    set(textRef, currentText)
    currentCodee.innerHTML += " ";

    currentCode = ""

    console.log(currentCode)
})
done.addEventListener("click", () =>{
    onValue(textRef, (snapshot) => {
        const storedText = snapshot.val(); // Get the value from the snapshot
        console.log("Stored text:", storedText);
        run(storedText + " scrie tot Scurt si la Obiect in limba engleza")
    });
    
    currentCode = ""
    currentCodee.innerText += ""
    
    currentText = ""
    set(textRef, currentText)

    console.log("SENDING MESSAGE...")
})

const morseToText = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    "/": " ", // Word separator
};

function translateMorseToText(morseCode) {
    const words = morseCode.trim().split(" / ");
    let translatedText = "";

    for (const word of words) {
        const letters = word.split(" ");
        for (const letter of letters) {
            if (morseToText.hasOwnProperty(letter)) {
                translatedText += morseToText[letter];
            } else {
                vibrateDevice();
                if (currentCodee.innerText.endsWith(currentCode)) {
                    // Remove the common part from currentCodee.innerText
                    const newInnerText = currentCodee.innerText.slice(0, -currentCode.length);
                    currentCodee.innerText = newInnerText;
                    console.log("Removed:", currentCode);
                } else {
                    console.log("No match found.");
                }
                currentCode = ""
                translatedText = ""
                
            }
        }
        translatedText += " ";
    }

    return translatedText.trim();
}
function vibrateDevice() {
    if ("vibrate" in navigator) {
        navigator.vibrate(2000);
    } else {
        console.log("Vibration not supported on this device.");
    }
}
