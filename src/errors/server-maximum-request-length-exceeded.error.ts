export class ServerMaximumRequestLengthExceededError extends Error {

    constructor(
        message: string = "The client has sent a request that exceeds the server's maximum request length. This setting is configurable in the Server's constructor option 'maxRequestLength'."
    ) {
        super(message);
        this.name = "ServerMaximumRequestLengthExceededError";
    }

}
