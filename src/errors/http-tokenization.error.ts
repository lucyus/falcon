export class HTTPTokenizationError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "HTTPTokenizationError";
    }

}
