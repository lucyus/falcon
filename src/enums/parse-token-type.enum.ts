export enum ParseTokenType {
    // Nothing to parse
    VOID = "void",

    // Used to throw unexpected syntax error
    UNKNOWN = "unknown",

    // Flags used to know at which point the parser starts
    START_LINE_FLAG = "start-line flag",

    // Request start-line
    START_LINE_REQUEST_HTTP_METHOD = "request http method",
    START_LINE_REQUEST_FIRST_SEPARATOR = "request start-line first separator",
    START_LINE_REQUEST_RESOURCE_PATH = "request resource path",
    START_LINE_REQUEST_SECOND_SEPARATOR = "request start-line second separator",
    START_LINE_REQUEST_PROTOCOL_NAME = "request protocol name",
    START_LINE_REQUEST_PROTOCOL_NAME_VERSION_SEPARATOR = "request protocol name-version separator",
    START_LINE_REQUEST_PROTOCOL_VERSION_MAJOR = "request protocol version major",
    START_LINE_REQUEST_PROTOCOL_VERSION_SEPARATOR = "request protocol version separator",
    START_LINE_REQUEST_PROTOCOL_VERSION_MINOR = "request protocol version minor",

    // Response start-line argument 1 OR Request start-line argument 3
    START_LINE_RESPONSE_PROTOCOL_NAME = "response protocol name",
    START_LINE_RESPONSE_PROTOCOL_NAME_VERSION_SEPARATOR = "response protocol name-version separator",
    START_LINE_RESPONSE_PROTOCOL_VERSION_MAJOR = "response protocol version major",
    START_LINE_RESPONSE_PROTOCOL_VERSION_SEPARATOR = "response protocol version separator",
    START_LINE_RESPONSE_PROTOCOL_VERSION_MINOR = "response protocol version minor",
    START_LINE_RESPONSE_FIRST_SEPARATOR = "reponse start-line first separator",
    START_LINE_RESPONSE_STATUS_CODE = "response status code",
    START_LINE_RESPONSE_SECOND_SEPARATOR = "reponse start-line second separator",
    START_LINE_RESPONSE_STATUS_NAME = "response status name",

    // Start-line end of line
    START_LINE_END_OF_LINE = "start-line end of line",

    // Headers
    HEADER_NAME = "header name",
    HEADER_NAME_VALUE_SEPARATOR = "header separator",
    HEADER_VALUE = "header value",
    HEADER_END_OF_LINE = "header end of line",
    HEADER_END_OF_HEADERS = "header end of headers",

    // Body
    BODY_DATA = "body data",
    BODY_END_OF_LINE = "body end of line",
    BODY_END_OF_BODY = "body end of body",
}
