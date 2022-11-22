export class WebSocketPayloadOverflowError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "WebSocketPayloadOverflowError";
    }

}
