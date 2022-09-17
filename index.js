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

const morseCode = (rate, prev, count) => {
    if (prev === 1) return (count / rate === 1) ? '.' : '-'
    else if (prev === 0) {
        if (count / (rate * 3) === 1) return ' '
        else if (count / (rate * 7) === 1) return '   '
        else return ''
    }
}

const transmissionRate = bits => {
    let regex = /(1+)(0+)?/g, ones = new Set(), zeros = new Set()
    let match = regex.exec(bits)
    while (match != null) {
        ones.add(match[1].length)
        if(match[2]) zeros.add(match[2].length)
        match = regex.exec(bits)
    }
    return Math.min(Math.min.apply(null, [...ones]), Math.min.apply(null, [...zeros]))
}

const decodeBits = bits => {
    bits = bits.replace(/^0+|0+$/g, '')
    let rate = transmissionRate(bits)
    let result = '', prev = 1,count = 0

    for (let i = 0; i < bits.length; i++) {
        let bit = Number(bits[i])
        if (bit === prev) count++
        else {
            result += morseCode(rate, prev, count)
            count = 1
            prev = bit
        }

        if (i === bits.length - 1) {
            result += morseCode(rate, prev, count)
        }
    }
    return result
}

const decodeMorse = morseCode => {
    var words = ''
    morseCode.split(" ").forEach(current => {
        if (current === "") {
            words += " "
        } else {
            if (MORSE_CODE[current]) {
                words += MORSE_CODE[current]
            }
        }
    });
    return words
}

let morse = decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011')
let result = decodeMorse(morse)
console.log(result)
