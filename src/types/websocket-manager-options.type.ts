import {
    WebSocketErrorHandler,
    WebSocketJoinHandler,
    WebSocketMessageHandler
} from ".";

export type WebSocketManagerOptions = {
    joinHandler?: WebSocketJoinHandler;
    messageHandler?: WebSocketMessageHandler;
    errorHandler?: WebSocketErrorHandler;
};
