let dot = document.getElementById("DOT")
let line = document.getElementById("LINE")
let space = document.getElementById("SPACE")
let done = document.getElementById("DONE")
let text = document.getElementById("text")
let next = document.getElementById("NEXT")


let currentCode = ""
let currentText = ""

dot.addEventListener("click", () => {
    currentCode += ".";
    console.log(currentCode);
});
line.addEventListener("click", () =>{

    currentCode += "-"
    console.log(currentCode)
})

space.addEventListener("click", () =>{

    currentCode += " / "
    console.log(currentCode)
})
next.addEventListener("click", () =>{
    text.innerText += translateMorseToText(currentCode)
    currentCode = ""
    console.log(currentCode)
})
done.addEventListener("click", () =>{
    currentCode = ""
    text.innerText = ""
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
                translatedText += "?";
            }
        }
        translatedText += " ";
    }

    return translatedText.trim();
}

