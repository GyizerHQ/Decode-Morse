import java.util.HashMap;

public class MorseCode {

  private static final HashMap<String, String> morseCodes = new HashMap<>();

  static {
    morseCodes.put(".", ".");
    morseCodes.put("-", "-");
    morseCodes.put(" ", " ");
  }

  public static String decodeBits(String bits) {
    String morseCode = "";
    int dotCount = 0;
    for (char bit : bits.toCharArray()) {
      if (bit == '1') {
        dotCount++;
      } else {
        if (dotCount == 1) {
          morseCode += '.';
        } else if (dotCount == 3) {
          morseCode += '-';
        } else {
          // Ignore any other sequence of 1's.
        }
        dotCount = 0;
      }
    }
    return morseCode;
  }

  public static String decodeMorse(String morseCode) {
    String text = "";
    for (String symbol : morseCode.split(" ")) {
      text += morseCodes.getOrDefault(symbol, "");
    }
    return text;
  }

  public static void main(String[] args) {
    String bits = "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011";
    String morseCode = decodeBits(bits);
    String text = decodeMorse(morseCode);
    System.out.println(text);
  }
}