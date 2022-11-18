import { HTTPSyntaxErrorDetailsType } from "../types/http-syntax-error.type";

export class HTTPSyntaxError extends Error {

    public details: HTTPSyntaxErrorDetailsType;

    constructor(details: HTTPSyntaxErrorDetailsType) {
        super(details.message);
        this.name = "HTTPSyntaxError";
        this.details = details;
    }

}
