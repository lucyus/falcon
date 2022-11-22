export class WebSocketFrameTypeError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "WebSocketFrameTypeError";
    }

}
