const MORSE_CODE = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "...": "H",
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
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...": "3",
  "...-": "4",
  "....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
  "...---...": "SOS",
};

function decodeMorse(morseCode) {
  let result = "";
  for (const word of morseCode) {
    let decodedWord = "";
    for (const char of word) {
      decodedWord += MORSE_CODE[char];
    }
    result += decodedWord + " ";
  }
  return result;
}

function decodeBits(bits) {
  let sentence = [];
  let word = [];
  let currentLength = 0;
  let currentChar = bits[0];
  let char = "";
  for (let i = 0; i < bits.length; i++) {
    if (currentChar === bits[i]) {
      currentLength += 1;
    } else {
      if (currentChar === "1") {
        if (currentLength === 2) {
          char += ".";
        } else if (currentLength === 6) {
          char += "-";
        }
      } else {
        if (currentLength === 2) {
          // Do nothing
        } else if (currentLength === 6) {
          word.push(char);
          char = "";
        } else if (word.length) {
          word.push(char);
          sentence.push(word);
          char = "";
          word = [];
        }
      }
      currentLength = 1;
      currentChar = bits[i];
    }
  }
  if (currentChar === "1") {
    if (currentLength === 2) {
      word.push(char + ".");
    } else {
      word.push(char + "-");
    }
    sentence.push(word);
  }
  return sentence;
}

const decodedMorse = decodeMorse(
  decodeBits(
    "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
  )
);

console.log(decodedMorse);
