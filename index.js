const input = '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011' 


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

const getTransRate = (bits) =>{
    let transmission = 0;
    let firstDot = 0;
    let firstSpace = 0; 
    
    for(let x in bits){
        if(bits[x] === '0') break;
        firstDot++;
    }

    for(let i = firstDot; i < bits.length ; i++){
        if(bits[i] === '1' ) break;
        firstSpace++;
    }
    
    
    if(firstSpace == 0 ){  //handles edge cases if not second char present
        transmission = firstDot;
    }else if (firstDot == firstSpace){ //handles edge case first dot can be a dash when transmission is of 1 unit
        let secondDot = 0;
        for(let i = firstDot + firstSpace; i < bits.length ; i++){
            if(bits[i] === '0' ) break;
            secondDot++;
        }
        if(secondDot > firstDot){
            transmission = firstDot;
        }else{
            transmission = secondDot
        }
        
    }else if (firstDot < firstSpace){
        transmission = firstDot;
    }else {
        transmission = firstSpace
    }
    
    return transmission;
}

const decodeBits = (bits) => {
    
    let newBits = bits.replace(new RegExp(`^[\s0]+|[\s0]+$`, 'g'),''); //removes leading and trailing zeros
    
    transmission = getTransRate(newBits); //gets transmission rate
    let pressed = 0;
    let released = 0;
    let morse = '';

    for(i = 0; i < newBits.length + transmission ;i += transmission){ 
        if(newBits[i] === '0'){
            released++
            if(pressed == 1){ //1time unit
                morse += '.';
            }else if(pressed == 3) {//3time unit
                morse += '-';
            }
            pressed = 0;
            continue;
        }else if(newBits[i] === '1') { 
            pressed++;
            if(released == 1){}
            else if(released == 3){
                morse += ' ' //charachter Space
            }else if(released == 7){
                morse += '   ' //word Space
            }
            released = 0;
        }else { //handles last bit at last since last bit in 1's
           if(pressed == 1){ //1time unit
                morse += '.';
            }else if(pressed == 3) {//3time unit
                morse += '-';
            }
        }
        
    }
    console.log('morse: ',morse);
    return morse
}

const decodeMorse = (morseCode) => {
        
    let words = morseCode.split('   ');
    let decoded = '';
    
    words.forEach((word)=>{
        word.split(' ').forEach((char)=>{
           for(let x in MORSE_CODE ){
                if(x === char){
                    decoded += MORSE_CODE[x] ;
                    break;
                };
            }
            
        })
        decoded += ' '
    })
    
    return decoded.trim();
}

let decoded = decodeMorse(decodeBits(input));
console.log('decoded: ',decoded)
