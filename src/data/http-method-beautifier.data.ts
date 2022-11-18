import { HTTPMethod } from "../types";

export const HTTP_METHOD_BEAUTIFIER: Record<string, HTTPMethod> = {
    "get": "GET",
    "post": "POST",
    "put": "PUT",
    "patch": "PATCH",
    "delete": "DELETE",
    "head": "HEAD",
    "options": "OPTIONS",
    "connect": "CONNECT",
    "trace": "TRACE"
};
