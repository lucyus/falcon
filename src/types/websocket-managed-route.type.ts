import { WebSocketHandshakeHandler } from ".";
import { WebSocketRouteManager } from "../core";

export type WebSocketManagedRoute = {
    path: string;
    webSocketRouteManager: WebSocketRouteManager;
    handshakeHandler: WebSocketHandshakeHandler;
};
