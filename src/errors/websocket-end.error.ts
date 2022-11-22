export class WebSocketEndError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "WebSocketEndError";
    }

}
