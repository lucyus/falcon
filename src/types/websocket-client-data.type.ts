import { Socket as TcpSocket } from "net";

import { RouteData } from "./route-data.type";

export type WebSocketClientData<WebSocketContext = any> = {
    client: TcpSocket;
    context: WebSocketContext;
    routeData: RouteData;
};
