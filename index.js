MORSE_CODE = {
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
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
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
    "...---...": "SOS"
}

def decodeMorse(morseCode):
    result = ""
    for word in morseCode:
        decoded_word = ""
        for char in word:
            decoded_word += MORSE_CODE[char]
        result += decoded_word + " "
    return result

def decodeBits(bits):
    sentence = []
    word = []
    current_length = 0
    current_char = bits[0]
    char = ""
    ans = 0
    for i in range(len(bits)):
        if current_char == bits[i]:
            current_length += 1
        else:
            if current_char == "1":
                if current_length == 2:
                    char += "."
                elif current_length == 6:
                    char += "-"
            else:
                if current_length == 2:
                    pass
                elif current_length == 6:
                    word.append(char)
                    char = ""
                elif word:
                    word.append(char)
                    sentence.append(word)
                    char = ""
                    word = []
            current_length = 1
            current_char = bits[i]
    if current_char == "1":
        if current_length == 2:
            word.append(char + ".")
        else:
            word.append(char + "-")
        sentence.append(word)
    return sentence

decoded_morse = decodeMorse(decodeBits("1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"))
print(decoded_morse)

