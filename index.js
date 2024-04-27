import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getDatabase, ref as dbRef, set, onValue } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';

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
    // You can update your UI or perform other actions with the retrieved value
});

let dot = document.getElementById("DOT")
let line = document.getElementById("LINE")
let space = document.getElementById("SPACE")
let done = document.getElementById("DONE")
let text = document.getElementById("text")
let next = document.getElementById("NEXT")
let currentCodee = document.getElementById("currentCode")


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
