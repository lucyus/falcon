import type { Socket as TcpSocket } from "net";
import type { WebSocketManager } from "../core/utilities";

export type WebSocketErrorHandler = (
        error: Error,
        webSocketManager: WebSocketManager,
        client: TcpSocket
    ) => (string | void) | Promise<string | void>
;
