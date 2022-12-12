import { HTTPRequest, HTTPResponse } from "../core";
import {
    RouteData,
    WebSocketAcceptHandshake,
    WebSocketRefuseHandshake
} from ".";

export type WebSocketHandshakeHandler = (
    request: HTTPRequest,
    response: HTTPResponse,
    routeData: RouteData
) => (WebSocketAcceptHandshake | WebSocketRefuseHandshake) |
    Promise<WebSocketAcceptHandshake | WebSocketRefuseHandshake>
;
