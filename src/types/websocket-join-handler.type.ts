import { WebSocketRouteManager } from "../core";
import { WebSocketClientData } from ".";

export type WebSocketJoinHandler = (
        webSocketRouteManager: WebSocketRouteManager,
        webSocketClientData: WebSocketClientData
    ) => (string | void) | Promise<string | void>
;
