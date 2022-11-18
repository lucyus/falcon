import { HTTPRequest, HTTPResponse } from "../core";

export type RequestHandler = (
    request: HTTPRequest,
    response: HTTPResponse
) => HTTPResponse;
