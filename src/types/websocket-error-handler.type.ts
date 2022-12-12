import { WebSocketClientData } from ".";
import { WebSocketRouteManager } from "../core";

export type WebSocketErrorHandler = (
        error: Error,
        webSocketRouteManager: WebSocketRouteManager,
        webSocketClientData: WebSocketClientData
    ) => (string | void) | Promise<string | void>
;
