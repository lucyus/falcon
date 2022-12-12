import { WebSocketHandlers, WebSocketHandshakeHandler } from ".";

export type WebSocketRoute = {
    path: string;
    handlers?: WebSocketHandlers;
    shouldHandshake?: WebSocketHandshakeHandler;
};
