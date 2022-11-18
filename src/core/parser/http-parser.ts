import { HTTP_HEADER_BEAUTIFIER, HTTP_METHODS } from "../../data";
import { HTTPSyntaxErrorReasonType, ParseTokenSuperType, ParseTokenType, TokenType } from "../../enums";
import { HTTPSyntaxError } from "../../errors/http-syntax.error";
import { HTTPRequestData, HTTPResponseData } from "../../interfaces";
import { HTTPMethod, ParseToken, Token } from "../../types";
import { HTTPMessage, HTTPRequest, HTTPResponse } from "../messages";
import { CharacterValidator, StringValidator } from "../validators";

export class HTTPParser {

    constructor() { }

    public static parse(tokens: Token[]): ParseToken[] {
        const parseTokens: ParseToken[] = [];
        let currentIndex: number = 0;
        let currentLine: number = 1;
        let currentColumn: number = 1;
        while (currentIndex < tokens.length) {
            const previousParseTokenType: ParseTokenType = parseTokens.length > 0 ?
                parseTokens[parseTokens.length - 1].type :
                ParseTokenType.START_LINE_FLAG
                ;
            const previousParseTokenValue: string | null = parseTokens.length > 0 ?
                parseTokens[parseTokens.length - 1].value :
                null
                ;
            const {
                parseToken,
                tokenIndexOffset,
                nextTokenLine,
                nextTokenColumn
            } = HTTPParser._digest(
                previousParseTokenType,
                previousParseTokenValue,
                tokens,
                currentIndex,
                currentLine,
                currentColumn
            );
            parseTokens.push(parseToken);
            currentIndex += tokenIndexOffset;
            currentLine = nextTokenLine;
            currentColumn = nextTokenColumn;
        }
        return parseTokens;
    }

    public static parseToObject(tokens: Token[]): HTTPRequestData | HTTPResponseData {
        const parseTokens = HTTPParser.parse(tokens);
        let raw: string = "";
        for (const parseToken of parseTokens) {
            raw += parseToken.value
        }
        const headers: { name: string, value: any }[] = [];
        const headerNameIndexes: number[] = [];
        for (let index = 10; index < parseTokens.length; ++index) {
            if (parseTokens[index].type === ParseTokenType.HEADER_NAME) {
                headerNameIndexes.push(index);
            }
        }
        for (const headerNameIndex of headerNameIndexes) {
            const headerName: string = parseTokens[headerNameIndex].value;
            headers.push({
                name: HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] || headerName,
                value: parseTokens[headerNameIndex + 2].value.trim()
            });
        }
        let body: string = "";
        const bodyStartIndex: number = parseTokens
            .findIndex(
                (parseToken: ParseToken) => parseToken.type === ParseTokenType.BODY_DATA
            )
        ;
        for (
            let index = bodyStartIndex;
            (
                index < parseTokens.length &&
                parseTokens[index] &&
                parseTokens[index].type !== ParseTokenType.BODY_END_OF_BODY
            );
            ++index
        ) {
            body += parseTokens[index].value;
        }
        if (parseTokens[0].type === ParseTokenType.START_LINE_REQUEST_HTTP_METHOD) {
            return {
                protocol: {
                    name: parseTokens[4].value,
                    version: {
                        major: Number(parseTokens[6].value),
                        minor: Number(parseTokens[8].value)
                    }
                },
                resource: {
                    method: parseTokens[0].value as HTTPMethod,
                    path: parseTokens[2].value
                },
                headers: headers,
                body: body
            };
        }
        else {
            return {
                protocol: {
                    name: parseTokens[0].value,
                    version: {
                        major: Number(parseTokens[2].value),
                        minor: Number(parseTokens[4].value)
                    }
                },
                status: {
                    code: Number(parseTokens[6].value),
                    name: parseTokens[8].value
                },
                headers: headers,
                body: body
            };
        }
    }

    protected static _digest(
        previousParseTokenType: ParseTokenType,
        previousParseTokenValue: string | null,
        tokens: Token[],
        tokenStartIndex: number,
        currentLine: number,
        currentColumn: number
    ): {
        parseToken: ParseToken,
        tokenIndexOffset: number,
        nextTokenLine: number,
        nextTokenColumn: number
    } {
        const token: Token | undefined = tokens[tokenStartIndex];
        const parseToken: ParseToken = {
            superType: ParseTokenSuperType.NONE,
            type: ParseTokenType.VOID,
            value: "",
            index: {
                start: token !== undefined ? token.index.start : 0,
                end: token !== undefined ? token.index.end : 0
            },
            location: {
                line: currentLine,
                column: currentColumn
            }
        };
        if (token === undefined) {
            return {
                parseToken,
                tokenIndexOffset: 1,
                nextTokenLine: currentLine,
                nextTokenColumn: currentColumn
            };
        }
        parseToken.value = token.value;
        parseToken.type = HTTPParser._determineTokenParseType(
            previousParseTokenType,
            previousParseTokenValue,
            token,
            currentLine,
            currentColumn
        );
        if (
            parseToken.type === ParseTokenType.START_LINE_END_OF_LINE ||
            parseToken.type === ParseTokenType.HEADER_END_OF_LINE ||
            parseToken.type === ParseTokenType.HEADER_END_OF_HEADERS ||
            parseToken.type === ParseTokenType.BODY_END_OF_LINE ||
            parseToken.type === ParseTokenType.BODY_END_OF_BODY
        ) {
            parseToken.superType = ParseTokenSuperType.END_OF_LINE;
        }
        parseToken.index.start = token.index.start;
        parseToken.index.end = token.index.end;
        parseToken.location.line = currentLine;
        parseToken.location.column = currentColumn;
        const nextTokenLine: number = parseToken.superType !== ParseTokenSuperType.END_OF_LINE ?
            currentLine :
            currentLine + 1
        ;
        const rawOffset: number = parseToken.index.end - parseToken.index.start + 1;
        let nextTokenColumn: number = parseToken.superType !== ParseTokenSuperType.END_OF_LINE ?
            currentColumn + rawOffset :
            1
        ;
        let additionnalTokenIndexOffset: number = 0;
        if (
            parseToken.type === ParseTokenType.START_LINE_REQUEST_RESOURCE_PATH ||
            parseToken.type === ParseTokenType.START_LINE_RESPONSE_STATUS_NAME ||
            parseToken.type === ParseTokenType.HEADER_NAME ||
            parseToken.type === ParseTokenType.HEADER_VALUE ||
            parseToken.type === ParseTokenType.BODY_DATA
        ) {
            additionnalTokenIndexOffset += HTTPParser._gatherSimilairParseTokenTypes(
                tokens,
                tokenStartIndex + 1,
                parseToken,
                nextTokenLine,
                nextTokenColumn
            );
            const rawOffset: number = parseToken.index.end - parseToken.index.start + 1;
            nextTokenColumn = parseToken.superType !== ParseTokenSuperType.END_OF_LINE ?
                currentColumn + rawOffset :
                1
            ;
        }
        return {
            parseToken,
            tokenIndexOffset: 1 + additionnalTokenIndexOffset,
            nextTokenLine,
            nextTokenColumn
        };
    }

    protected static _determineTokenParseType(
        previousParseTokenType: ParseTokenType,
        previousParseTokenValue: string | null,
        token: Token,
        currentLine: number,
        currentColumn: number
    ): ParseTokenType {
        switch (previousParseTokenType) {
            case ParseTokenType.START_LINE_FLAG:
                if (token.type !== TokenType.IDENTIFIER) {
                    throw new HTTPSyntaxError({
                        type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_FIRST_ARGUMENT,
                        location: {
                            line: currentLine,
                            column: currentColumn
                        }
                    });
                }
                if (token.type === TokenType.IDENTIFIER && token.value === "HTTP") {
                    return ParseTokenType.START_LINE_RESPONSE_PROTOCOL_NAME;
                }
                if ((HTTP_METHODS as string[]).includes(token.value)) {
                    return ParseTokenType.START_LINE_REQUEST_HTTP_METHOD;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_FIRST_ARGUMENT,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_HTTP_METHOD:
                if (token.type === TokenType.SPACE) {
                    return ParseTokenType.START_LINE_REQUEST_FIRST_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_FIRST_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_FIRST_SEPARATOR:
                if (
                    token.type === TokenType.SLASH || // origin-form
                    token.type === TokenType.IDENTIFIER || // absolute-form or authority-form with domain name
                    token.type === TokenType.INTEGER || // authority-form with IP address
                    token.type === TokenType.ASTERISK // asterisk-form
                ) {
                    return ParseTokenType.START_LINE_REQUEST_RESOURCE_PATH;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_RESOURCE_TARGET_FORM,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    },
                    message: "The provided resource target form is none of the following: origin-form, absolute-form, authority-form, asterisk-form"
                });
            case ParseTokenType.START_LINE_REQUEST_RESOURCE_PATH:
                if (token.type === TokenType.SPACE) {
                    return ParseTokenType.START_LINE_REQUEST_SECOND_SEPARATOR;
                }
                if (
                    token.type !== TokenType.CRLF &&
                    !HTTPParser._isForbiddenHTTPToken(token.type)
                ) {
                    return ParseTokenType.START_LINE_REQUEST_RESOURCE_PATH;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_SECOND_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_SECOND_SEPARATOR:
                if (token.type === TokenType.IDENTIFIER && token.value === "HTTP") {
                    return ParseTokenType.START_LINE_REQUEST_PROTOCOL_NAME;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_PROTOCOL_NAME,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_PROTOCOL_NAME:
                if (token.type === TokenType.SLASH) {
                    return ParseTokenType.START_LINE_REQUEST_PROTOCOL_NAME_VERSION_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_PROTOCOL_NAME_VERSION_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_PROTOCOL_NAME_VERSION_SEPARATOR:
                if (token.type === TokenType.INTEGER) {
                    return ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_MAJOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_MAJOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_MAJOR:
                if (token.type === TokenType.DOT) {
                    return ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_SEPARATOR:
                if (token.type === TokenType.INTEGER) {
                    return ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_MINOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_MINOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_REQUEST_PROTOCOL_VERSION_MINOR:
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.START_LINE_END_OF_LINE;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_END_OF_LINE,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_PROTOCOL_NAME:
                if (token.type === TokenType.SLASH) {
                    return ParseTokenType.START_LINE_RESPONSE_PROTOCOL_NAME_VERSION_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_PROTOCOL_NAME_VERSION_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_PROTOCOL_NAME_VERSION_SEPARATOR:
                if (token.type === TokenType.INTEGER) {
                    return ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_MAJOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_MAJOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_MAJOR:
                if (token.type === TokenType.DOT) {
                    return ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_SEPARATOR:
                if (token.type === TokenType.INTEGER) {
                    return ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_MINOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_MINOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_PROTOCOL_VERSION_MINOR:
                if (token.type === TokenType.SPACE) {
                    return ParseTokenType.START_LINE_RESPONSE_FIRST_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_FIRST_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_FIRST_SEPARATOR:
                if (token.type === TokenType.INTEGER) {
                    return ParseTokenType.START_LINE_RESPONSE_STATUS_CODE;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_STATUS_CODE,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_STATUS_CODE:
                if (token.type === TokenType.SPACE) {
                    return ParseTokenType.START_LINE_RESPONSE_SECOND_SEPARATOR;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_SECOND_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_SECOND_SEPARATOR:
                if (
                    token.type === TokenType.IDENTIFIER &&
                    StringValidator.isAlpha(token.value)
                ) {
                    return ParseTokenType.START_LINE_RESPONSE_STATUS_NAME;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_RESPONSE_STATUS_NAME,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_RESPONSE_STATUS_NAME:
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.START_LINE_END_OF_LINE;
                }
                if (token.type === TokenType.SPACE) {
                    return ParseTokenType.START_LINE_RESPONSE_STATUS_NAME;
                }
                if (
                    token.type === TokenType.IDENTIFIER &&
                    StringValidator.isAlpha(token.value)
                ) {
                    return ParseTokenType.START_LINE_RESPONSE_STATUS_NAME;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_START_LINE_END_OF_LINE,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.START_LINE_END_OF_LINE:
                if (
                    token.type === TokenType.IDENTIFIER &&
                    StringValidator.isAlpha(token.value)
                ) {
                    return ParseTokenType.HEADER_NAME;
                }
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.HEADER_END_OF_HEADERS;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_HEADER_NAME,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.HEADER_NAME:
                if (token.type === TokenType.COLON) {
                    return ParseTokenType.HEADER_NAME_VALUE_SEPARATOR;
                }
                if (
                    token.type === TokenType.IDENTIFIER
                    && StringValidator.isAlpha(token.value)
                ) {
                    if (
                        previousParseTokenValue !== null &&
                        CharacterValidator.isHyphen(previousParseTokenValue)
                    ) {
                        return ParseTokenType.HEADER_NAME;
                    }
                    throw new HTTPSyntaxError({
                        type: HTTPSyntaxErrorReasonType.INVALID_HEADER_NAME,
                        location: {
                            line: currentLine,
                            column: currentColumn
                        }
                    });
                }
                if (token.type === TokenType.HYPHEN) {
                    if (
                        previousParseTokenValue !== null &&
                        StringValidator.isAlpha(previousParseTokenValue)
                    ) {
                        return ParseTokenType.HEADER_NAME;
                    }
                    throw new HTTPSyntaxError({
                        type: HTTPSyntaxErrorReasonType.INVALID_HEADER_NAME,
                        location: {
                            line: currentLine,
                            column: currentColumn
                        }
                    });
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_HEADER_NAME_VALUE_SEPARATOR,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.HEADER_NAME_VALUE_SEPARATOR:
                if (token.type !== TokenType.CRLF) {
                    return ParseTokenType.HEADER_VALUE;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_HEADER_VALUE,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.HEADER_VALUE:
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.HEADER_END_OF_LINE;
                }
                if (HTTPParser._isForbiddenHTTPToken(token.type)) {
                    throw new HTTPSyntaxError({
                        type: HTTPSyntaxErrorReasonType.INVALID_HEADER_VALUE_OR_INVALID_HEADER_END_OF_LINE,
                        location: {
                            line: currentLine,
                            column: currentColumn
                        }
                    });
                }
                return ParseTokenType.HEADER_VALUE;
            case ParseTokenType.HEADER_END_OF_LINE:
                if (
                    token.type === TokenType.IDENTIFIER &&
                    StringValidator.isAlpha(token.value)
                ) {
                    return ParseTokenType.HEADER_NAME;
                }
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.HEADER_END_OF_HEADERS;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_HEADER_END_OF_HEADERS_OR_INVALID_HEADER_NAME,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
            case ParseTokenType.HEADER_END_OF_HEADERS:
                if (token.type !== TokenType.CRLF) {
                    return ParseTokenType.BODY_DATA;
                }
                return ParseTokenType.BODY_END_OF_LINE;
            case ParseTokenType.BODY_DATA:
                if (token.type !== TokenType.CRLF) {
                    return ParseTokenType.BODY_DATA;
                }
                return ParseTokenType.BODY_END_OF_LINE;
            case ParseTokenType.BODY_END_OF_LINE:
                if (token.type === TokenType.CRLF) {
                    return ParseTokenType.BODY_END_OF_BODY;
                }
                return ParseTokenType.BODY_DATA;
            case ParseTokenType.BODY_END_OF_BODY:
                if (
                    token.type === TokenType.IDENTIFIER &&
                    StringValidator.isAlpha(token.value)
                ) {
                    return ParseTokenType.HEADER_NAME;
                }
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.INVALID_HEADER_NAME,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    },
                    message: "Invalid trailer header name"
                });
            default:
                throw new HTTPSyntaxError({
                    type: HTTPSyntaxErrorReasonType.UNEXPECTED_TOKEN,
                    location: {
                        line: currentLine,
                        column: currentColumn
                    }
                });
        }
    }

    protected static _isForbiddenHTTPToken(tokenType: TokenType): boolean {
        return tokenType === TokenType.TABULATION ||
            tokenType === TokenType.VERTICAL_TABULATION ||
            tokenType === TokenType.CARRIAGE_RETURN ||
            tokenType === TokenType.LINE_FEED ||
            tokenType === TokenType.FORM_FEED ||
            tokenType === TokenType.BACKSPACE ||
            tokenType === TokenType.NULL
            ;
    }

    protected static _gatherSimilairParseTokenTypes(
        tokens: Token[],
        tokenStartIndex: number,
        parseToken: ParseToken,
        startLine: number,
        startColumn: number
    ): number {
        let offset: number = 0;
        const currentParseTokenType: ParseTokenType = parseToken.type;
        let currentTokenValue: string = parseToken.value;
        let nextToken: Token | undefined = tokens[tokenStartIndex + offset];
        let nextTokenLine: number = startLine;
        let nextTokenColumn: number = startColumn;
        let nextTokenParseType: ParseTokenType | null = nextToken !== undefined ?
            HTTPParser._determineTokenParseType(
                currentParseTokenType,
                currentTokenValue,
                nextToken,
                nextTokenLine,
                nextTokenColumn
            ) :
            null
        ;
        while (
            nextTokenParseType !== null &&
            nextTokenParseType === parseToken.type
        ) {
            parseToken.value += nextToken.value;
            parseToken.index.end += nextToken.index.end - nextToken.index.start + 1;
            currentTokenValue = nextToken.value;
            ++offset;
            nextToken = tokens[tokenStartIndex + offset];
            nextTokenLine = parseToken.superType !== ParseTokenSuperType.END_OF_LINE ?
                nextTokenLine :
                nextTokenLine + 1
            ;
            const rawOffset: number = nextToken.index.end - nextToken.index.start + 1;
            nextTokenColumn = parseToken.superType !== ParseTokenSuperType.END_OF_LINE ?
                nextTokenColumn + rawOffset :
                1
            ;
            nextTokenParseType = nextToken !== undefined ?
                HTTPParser._determineTokenParseType(
                    currentParseTokenType,
                    currentTokenValue,
                    nextToken,
                    nextTokenLine,
                    nextTokenColumn
                ) :
                null
            ;
        }
        return offset;
    }

}
