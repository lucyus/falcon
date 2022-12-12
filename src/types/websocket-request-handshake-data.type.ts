import { Socket as TcpSocket } from "net";

export type WebSocketRequestHandshakeData = {
    client: TcpSocket;
    webSocketKey: string;
}
