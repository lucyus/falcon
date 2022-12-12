import { WebSocketClientData } from ".";
import { WebSocketRouteManager } from "../core";

export type WebSocketMessageHandler = (
        message: string,
        webSocketRouteManager: WebSocketRouteManager,
        webSocketClientData: WebSocketClientData
    ) => (string | void) | Promise<string | void>
;
