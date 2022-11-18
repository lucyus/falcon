 export class CharacterValidator {

    public static isLetter(character: string): boolean {
        return /^\p{L}/u.test(character);
    }

    public static isDigit(character: string): boolean {
        return /^\d/.test(character);
    }

    public static isSpace(character: string): boolean {
        return character === ' ';
    }

    public static isTabulation(character: string): boolean {
        return character === '\t';
    }

    public static isVerticalTabulation(character: string): boolean {
        return character === '\v';
    }

    public static isNull(character: string): boolean {
        return character === '\0';
    }

    public static isBackspace(character: string): boolean {
        return character === '\b';
    }

    public static isCarriageReturn(character: string): boolean {
        return character === '\r';
    }

    public static isLineFeed(character: string): boolean {
        return character === '\n';
    }

    public static isFormFeed(character: string): boolean {
        return character === '\f';
    }

    public static isDot(character: string): boolean {
        return character === '.';
    }

    public static isComma(character: string): boolean {
        return character === ',';
    }

    public static isColon(character: string): boolean {
        return character === ':';
    }

    public static isSemiColon(character: string): boolean {
        return character === ';';
    }

    public static isDoubleQuote(character: string): boolean {
        return character === '"';
    }

    public static isSingleQuote(character: string): boolean {
        return character === "'";
    }

    public static isBackQuote(character: string): boolean {
        return character === '`';
    }

    public static isEqualSign(character: string): boolean {
        return character === '=';
    }

    public static isPlusSign(character: string): boolean {
        return character === '+';
    }

    public static isQuestionMark(character: string): boolean {
        return character === '?';
    }

    public static isExclamationMark(character: string): boolean {
        return character === '!';
    }

    public static isAsterisk(character: string): boolean {
        return character === '*';
    }

    public static isHyphen(character: string): boolean {
        return character === '-';
    }

    public static isUnderscore(character: string): boolean {
        return character === '_';
    }

     public static isSlash(character: string): boolean {
        return character === '/';
    }

    public static isBackSlash(character: string): boolean {
        return character === '\\';
    }

    public static isOpenSquareBracket(character: string): boolean {
        return character === '[';
    }

    public static isCloseSquareBracket(character: string): boolean {
        return character === ']';
    }

    public static isOpenParenthesis(character: string): boolean {
        return character === '(';
    }

    public static isCloseParenthesis(character: string): boolean {
        return character === ')';
    }

    public static isOpenCurlyBracket(character: string): boolean {
        return character === '{';
    }

    public static isCloseCurlyBracket(character: string): boolean {
        return character === '}';
    }

    public static isOpenAngleBracket(character: string): boolean {
        return character === '<';
    }

    public static isCloseAngleBracket(character: string): boolean {
        return character === '>';
    }

    public static isPipe(character: string): boolean {
        return character === '|';
    }

    public static isAmpersand(character: string): boolean {
        return character === '&';
    }

    public static isTilde(character: string): boolean {
        return character === '~';
    }

    public static isHashSign(character: string): boolean {
        return character === '#';
    }

    public static isCaret(character: string): boolean {
        return character === '^';
    }

     public static isArobase(character: string): boolean {
        return character === '@';
    }

    public static isPercent(character: string): boolean {
        return character === '%';
    }

    public static isDollar(character: string): boolean {
        return character === '$';
    }

}
