const MORSE_CODE = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '-----': '0',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '.-.-.-': '.',
    '--..--': ',',
    '..--..': '?',
    '.----.': "'",
    '-.-.--': '!',
    '-..-.': '/',
    '-.--.': '(',
    '-.--.-': ')',
    '.-...': '&',
    '---...': ':',
    '-.-.-.': ';',
    '-...-': '=',
    '.-.-.': '+',
    '-....-': '-',
    '..--.-': '_',
    '.-..-.': '"',
    '...-..-': '$',
    '.--.-.': '@',
    '...---...': 'SOS'
}
const decodeBits = (bits) => {
    // Remove leading and trailing zeros
    bits = bits.replace(/^0+|0+$/g, '');
  
    const timeUnit = Math.min(...bits.match(/1+|0+/g).map((segment) => segment.length));
  
    // Convert the bits to Morse code
    const morseCode = bits
      .replace(new RegExp('1{' + 3 * timeUnit + '}', 'g'), '-')
      .replace(new RegExp('1{' + timeUnit + '}', 'g'), '.')
      .replace(new RegExp('0{' + 7 * timeUnit + '}', 'g'), '   ')
      .replace(new RegExp('0{' + 3 * timeUnit + '}', 'g'), ' ')
      .replace(new RegExp('0{' + timeUnit + '}', 'g'), '');
  
    return morseCode;
  };
  
const decodeMorse = (morseCode) => {
    return morseCode
      .trim() // Remove leading and trailing spaces
      .split('   ') // Split into words
      .map((word) =>
        word
          .split(' ') // Split into characters
          .map((character) => MORSE_CODE[character] || '') // Decode characters
          .join('')
      )
      .join(' '); // Join words with spaces
  };

// Example
  const bits = '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011';
  const morseCode = decodeBits(bits);
  const message = decodeMorse(morseCode);
  
  console.log(message); 
  // Output: "HEY JUDE"
  