import { WebSocketRouteManager } from "../core";
import { WebSocketClientData } from ".";

export type WebSocketLeaveHandler = (
        webSocketRouteManager: WebSocketRouteManager,
        webSocketClientData: WebSocketClientData
    ) => void | Promise<void>
;
