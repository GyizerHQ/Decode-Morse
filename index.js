MORSE_CODE = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
    '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
    '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
    '-----': '0', '--..--': ',', '.-.-.-': '.', '..--..': '?', '-..-.': '/',
    '-....-': '-', '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':',
    '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_',
    '.-..-.': '"', '...-..-': '$', '.--.-.': '@', '...---...': 'SOS'
}

def decodeBits(bits):
    # Determine the transmission rate
    min_time_unit = float('inf')
    i = 0
    while i < len(bits):
        if bits[i] == '1':
            j = i + 1
            while j < len(bits) and bits[j] == '0':
                j += 1
            if j - i < min_time_unit:
                min_time_unit = j - i
            i = j
        else:
            i += 1

    time_unit = min_time_unit // 1  # Round down to the nearest integer

    # Decode the message
    morse_code = []
    bit_groups = bits.strip('0').split('0' * time_unit)
    for group in bit_groups:
        if group == '':
            morse_code.append(' ')
        else:
            symbol = '.' * (group.count('1') // time_unit)
            morse_code.append(symbol)

    return ''.join(morse_code)

def decodeMorse(morseCode):
    # Convert Morse code to human-readable string
    morse_words = morseCode.strip().split('   ')
    decoded_message = []
    for word in morse_words:
        morse_letters = word.split(' ')
        decoded_letters = [MORSE_CODE[letter] for letter in morse_letters if letter in MORSE_CODE]
        decoded_message.append(''.join(decoded_letters))

    return ' '.join(decoded_message)
