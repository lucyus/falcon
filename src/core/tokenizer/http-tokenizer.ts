import { TokenType } from "../../enums";
import { Token } from "../../types";
import { CharacterValidator } from "../validators";

export class HTTPTokenizer {

    constructor() { }

    public static tokenize(data: string): Token[] {
        const tokens: Token[] = [];
        let index: number = 0;
        while (index < data.length) {
            const token: Token = HTTPTokenizer._digest(data, index);
            tokens.push(token);
            index += token.index.end - token.index.start + 1;
        }
        return tokens;
    }

    protected static _digest(data: string, startIndex: number): Token {
        const token: Token = {
            type: TokenType.VOID,
            value: "",
            index: {
                start: startIndex,
                end: startIndex
            }
        };
        if (data[startIndex] === undefined) {
            return token;
        }
        token.value = data[startIndex];
        token.type = HTTPTokenizer._determineCharacterType(token.value);
        token.index.start = startIndex;
        token.index.end = startIndex;
        if (
            token.type === TokenType.IDENTIFIER ||
            token.type === TokenType.INTEGER
        ) {
            HTTPTokenizer._gatherSimilarTokenTypes(data, token);
            return token;
        }
        if (token.type === TokenType.CARRIAGE_RETURN) {
            const nextValue: string | undefined = data[token.index.end + 1];
            if (
                nextValue !== undefined &&
                HTTPTokenizer._determineCharacterType(nextValue) === TokenType.LINE_FEED
            ) {
                token.type = TokenType.CRLF;
                token.value += nextValue;
                ++token.index.end;
            }
        }
        return token;
    }

    protected static _determineCharacterType(character: string): TokenType {
        if (CharacterValidator.isLetter(character)) {
            return TokenType.IDENTIFIER;
        }
        if (CharacterValidator.isDigit(character)) {
            return TokenType.INTEGER;
        }
        if (CharacterValidator.isSpace(character)) {
            return TokenType.SPACE;
        }
        if (CharacterValidator.isTabulation(character)) {
            return TokenType.TABULATION;
        }
        if (CharacterValidator.isVerticalTabulation(character)) {
            return TokenType.VERTICAL_TABULATION;
        }
        if (CharacterValidator.isCarriageReturn(character)) {
            return TokenType.CARRIAGE_RETURN;
        }
        if (CharacterValidator.isLineFeed(character)) {
            return TokenType.LINE_FEED;
        }
        if (CharacterValidator.isFormFeed(character)) {
            return TokenType.FORM_FEED;
        }
        if (CharacterValidator.isDot(character)) {
            return TokenType.DOT;
        }
        if (CharacterValidator.isComma(character)) {
            return TokenType.COMMA;
        }
        if (CharacterValidator.isColon(character)) {
            return TokenType.COLON;
        }
        if (CharacterValidator.isSemiColon(character)) {
            return TokenType.SEMICOLON;
        }
        if (CharacterValidator.isDoubleQuote(character)) {
            return TokenType.DOUBLE_QUOTATION_MARK;
        }
        if (CharacterValidator.isEqualSign(character)) {
            return TokenType.EQUAL_SIGN;
        }
        if (CharacterValidator.isQuestionMark(character)) {
            return TokenType.QUESTION_MARK;
        }
        if (CharacterValidator.isExclamationMark(character)) {
            return TokenType.EXCLAMATION_MARK;
        }
        if (CharacterValidator.isAsterisk(character)) {
            return TokenType.ASTERISK;
        }
        if (CharacterValidator.isPlusSign(character)) {
            return TokenType.PLUS_SIGN;
        }
        if (CharacterValidator.isHyphen(character)) {
            return TokenType.HYPHEN;
        }
        if (CharacterValidator.isUnderscore(character)) {
            return TokenType.UNDERSCORE;
        }
        if (CharacterValidator.isSlash(character)) {
            return TokenType.SLASH;
        }
        if (CharacterValidator.isBackSlash(character)) {
            return TokenType.BACKSLASH;
        }
        if (CharacterValidator.isOpenParenthesis(character)) {
            return TokenType.OPEN_PARENTHESIS;
        }
        if (CharacterValidator.isCloseParenthesis(character)) {
            return TokenType.CLOSE_PARENTHESIS;
        }
        if (CharacterValidator.isOpenSquareBracket(character)) {
            return TokenType.OPEN_SQUARE_BRACKET;
        }
        if (CharacterValidator.isCloseSquareBracket(character)) {
            return TokenType.CLOSE_SQUARE_BRACKET;
        }
        if (CharacterValidator.isOpenCurlyBracket(character)) {
            return TokenType.OPEN_CURLY_BRACKET;
        }
        if (CharacterValidator.isCloseCurlyBracket(character)) {
            return TokenType.CLOSE_CURLY_BRACKET;
        }
        if (CharacterValidator.isOpenAngleBracket(character)) {
            return TokenType.OPEN_ANGLE_BRACKET;
        }
        if (CharacterValidator.isCloseAngleBracket(character)) {
            return TokenType.CLOSE_ANGLE_BRACKET;
        }
        if (CharacterValidator.isAmpersand(character)) {
            return TokenType.AMPERSAND;
        }
        if (CharacterValidator.isTilde(character)) {
            return TokenType.TILDE;
        }
        if (CharacterValidator.isHashSign(character)) {
            return TokenType.HASH_SIGN;
        }
        if (CharacterValidator.isCaret(character)) {
            return TokenType.CARET_SIGN;
        }
        if (CharacterValidator.isPercent(character)) {
            return TokenType.PERCENT_SIGN;
        }
        if (CharacterValidator.isArobase(character)) {
            return TokenType.AROBASE;
        }
        if (CharacterValidator.isDollar(character)) {
            return TokenType.DOLLAR;
        }
        if (CharacterValidator.isSingleQuote(character)) {
            return TokenType.SINGLE_QUOTATION_MARK;
        }
        if (CharacterValidator.isBackQuote(character)) {
            return TokenType.BACK_QUOTATION_MARK;
        }
        if (CharacterValidator.isPipe(character)) {
            return TokenType.PIPE;
        }
        if (CharacterValidator.isBackspace(character)) {
            return TokenType.BACKSPACE;
        }
        if (CharacterValidator.isNull(character)) {
            return TokenType.NULL;
        }
        return TokenType.UNKNOWN;
    }

    protected static _gatherSimilarTokenTypes(data: string, token: Token): Token {
        ++token.index.end;
        let nextValue: string | undefined = data[token.index.end];
        while (
            nextValue !== undefined &&
            HTTPTokenizer._determineCharacterType(nextValue) === token.type
        ) {
            token.value += nextValue;
            ++token.index.end;
            nextValue = data[token.index.end];
        }
        --token.index.end;
        return token;
    }

}
