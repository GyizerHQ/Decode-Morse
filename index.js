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

    bits = bits.replace(/(^0+|0+$)/g, '')
    console.log(bits)

    // check pattern to get the space  to get if bits is char or words
    const checkPatterns = bits.match(/1+|0+/g);
    let morseCode = '';

    // to get the transmission rate 
    const timeUnits = Math.min(...checkPatterns.map(d => d.length));

    // to loop over the pattern created so that it can be converted to '.' or '-'
    for (let i = 0; i < checkPatterns.length; i += 1) {
        const pattern = checkPatterns[i];
        const unitCount = pattern.length / timeUnits;
        if (pattern[0] === '1') {
           if (unitCount === 1) {
             morseCode += '.'
           } else {
            morseCode += '-'
           }
        } else if (pattern[0] === '0') {
            if (unitCount === 3) {
              morseCode += ' ';
            } else if (unitCount === 7) {
              morseCode += '   ';
            } 
          }
        //   return morseCode
    }

    return morseCode;

}
const decodeMorse = (morseCode) => {
    return morseCode
    .trim()
    .split('   ')
    .map(word =>
      word
        .split(' ')
        .map(char => MORSE_CODE[char])
        .join('')
    )
    .join(' ');
}

console.log(decodeMorse(decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011')))