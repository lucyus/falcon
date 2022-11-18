export enum HTTPSyntaxErrorReasonType {
    UNEXPECTED_END_OF_DATA = "unexpected_end_of_data",
    UNEXPECTED_TOKEN = "unexpected_token",

    INVALID_START_LINE_FIRST_ARGUMENT = "invalid_start_line_first_argument",

    INVALID_START_LINE_REQUEST_FIRST_SEPARATOR = "invalid_start_line_request_first_separator",
    INVALID_START_LINE_REQUEST_RESOURCE_TARGET_FORM = "invalid_start_line_request_resource_target_form",
    INVALID_START_LINE_REQUEST_SECOND_SEPARATOR = "invalid_start_line_request_second_separator",
    INVALID_START_LINE_REQUEST_PROTOCOL_NAME = "invalid_start_line_request_protocol_name",
    INVALID_START_LINE_REQUEST_PROTOCOL_NAME_VERSION_SEPARATOR = "invalid_start_line_request_protocol_name_version_separator",
    INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_MAJOR = "invalid_start_line_request_protocol_version_major",
    INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_SEPARATOR = "invalid_start_line_request_protocol_version_separator",
    INVALID_START_LINE_REQUEST_PROTOCOL_VERSION_MINOR = "invalid_start_line_request_protocol_version_minor",

    INVALID_START_LINE_RESPONSE_PROTOCOL_NAME_VERSION_SEPARATOR = "invalid_start_line_response_protocol_name_version_separator",
    INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_MAJOR = "invalid_start_line_response_protocol_version_major",
    INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_SEPARATOR = "invalid_start_line_response_protocol_version_separator",
    INVALID_START_LINE_RESPONSE_PROTOCOL_VERSION_MINOR = "invalid_start_line_response_protocol_version_minor",
    INVALID_START_LINE_RESPONSE_FIRST_SEPARATOR = "invalid_start_line_response_first_separator",
    INVALID_START_LINE_RESPONSE_STATUS_CODE = "invalid_start_line_response_status_code",
    INVALID_START_LINE_RESPONSE_SECOND_SEPARATOR = "invalid_start_line_response_second_separator",
    INVALID_START_LINE_RESPONSE_STATUS_NAME = "invalid_start_line_response_status_name",

    INVALID_START_LINE_END_OF_LINE = "invalid_start_line_end_of_line",

    INVALID_HEADER_NAME = "invalid_header_name",
    INVALID_HEADER_NAME_VALUE_SEPARATOR = "invalid_header_name_value_separator",
    INVALID_HEADER_VALUE = "invalid_header_value",
    INVALID_HEADER_VALUE_OR_INVALID_HEADER_END_OF_LINE = "invalid_header_value_or_invalid_header_end_of_line",
    INVALID_HEADER_END_OF_HEADERS_OR_INVALID_HEADER_NAME = "invalid_header_end_of_headers_or_invalid_header_name",

    INVALID_BODY_END_OF_BODY = "invalid_body_end_of_body",
}
