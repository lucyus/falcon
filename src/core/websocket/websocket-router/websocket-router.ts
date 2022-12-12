import { Socket as TcpSocket } from "net";
import { createHash } from "crypto";

import { HTTP_STATUS_NAME } from "../../../data";
import {
    RouteData,
    RouterHandler,
    WebSocketAcceptHandshake,
    WebSocketHandlers,
    WebSocketHandshakeHandler,
    WebSocketManagedRoute,
    WebSocketRequestHandshakeData,
    WebSocketRouterOptions
} from "../../../types";
import { HTTPRequest, HTTPResponse } from "../../messages";
import { Path } from "../../utilities";
import { WebSocketRouteManager } from "../websocket-route-manager";

export class WebSocketRouter {

    protected _routes: WebSocketManagedRoute[];
    protected _notFoundHandler: RouterHandler;

    constructor(webSocketRouterOptions?: WebSocketRouterOptions) {
        this._routes = [];
        this._notFoundHandler = this._defaultNotFoundHandler;
        if (webSocketRouterOptions !== undefined) {
            if (webSocketRouterOptions.routes !== undefined) {
                for (const route of webSocketRouterOptions.routes) {
                    this.add(route.path, route.handlers, route.shouldHandshake);
                }
            }
            if (webSocketRouterOptions.routeNotFoundHandler !== undefined) {
                this._notFoundHandler = webSocketRouterOptions.routeNotFoundHandler;
            }
        }
    }

    public add(
        path: string,
        handlers?: WebSocketHandlers,
        handshakeHandler?: WebSocketHandshakeHandler
    ): void {
        if (this._getByPath(path) !== undefined) {
            return;
        }
        this._routes.push({
            path,
            webSocketRouteManager: new WebSocketRouteManager(handlers),
            handshakeHandler: handshakeHandler ?? this._defaultHandshakeHandler
        });
    }

    public delete(path: string): void {
        const indexToRemove = this._routes
            .findIndex(route => route.path === path)
        ;
        if (indexToRemove === -1) {
            return;
        }
        this._routes.splice(indexToRemove, 1);
    }

    public async handleHandshakeRequest(
        request: HTTPRequest,
        response: HTTPResponse,
        requestHandshakeData: WebSocketRequestHandshakeData
    ): Promise<HTTPResponse> {
        const path = request.parsed.resource.path;
        const route = this._getByPath(path.split("?")[0]);
        const routeData: RouteData = {
            path,
            params: {},
            queryParams: Path.buildQueryParams(path)
        };
        if (route !== undefined) {
            routeData.params = Path.buildParams(path, route.path);
            const handshakeStrategy = await route.handshakeHandler(request, response, routeData);
            if ("refuseResponse" in handshakeStrategy) {
                return handshakeStrategy.refuseResponse;
            }
            response.headers.set("Upgrade", [
                {
                    protocol: {
                        name: "websocket"
                    }
                }
            ]);
            response.headers.set("Connection", ["Upgrade"]);
            response.headers.set(
                "Sec-WebSocket-Accept",
                createHash("sha1")
                    .update(requestHandshakeData.webSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
                    .digest("base64")
            );
            response.status = {
                code: 101,
                name: HTTP_STATUS_NAME[101]
            };
            route.webSocketRouteManager.register({
                client: requestHandshakeData.client,
                context: handshakeStrategy.acceptContext,
                routeData
            });
            return response;
        }
        return this._notFoundHandler(request, response, routeData);
    }

    public async handleHandshakeEstablished(client: TcpSocket): Promise<void> {
        const route = this.getRouteByClient(client);
        if (route !== undefined) {
            const clientData = route.webSocketRouteManager.getWebSocketClientData(client);
            if (clientData !== undefined) {
                const responseMessage = await route.webSocketRouteManager.handleJoin(
                    route.webSocketRouteManager,
                    clientData
                );
                if (responseMessage !== undefined) {
                    await route.webSocketRouteManager.send(responseMessage, client);
                }
            }
        }
    }

    public handleMessage(
        message: string,
        client: TcpSocket
    ): string | void | Promise<string | void> {
        const route = this._getByClient(client);
        if (route !== undefined) {
            const clientData = route.webSocketRouteManager.getWebSocketClientData(client);
            if (clientData !== undefined) {
                return route.webSocketRouteManager.handleMessage(
                    message,
                    route.webSocketRouteManager,
                    clientData
                );
            }
        }
    }

    public handleError(
        error: Error,
        client: TcpSocket
    ): string | void | Promise<string | void> {
        const route = this._getByClient(client);
        if (route !== undefined) {
            const clientData = route.webSocketRouteManager.getWebSocketClientData(client);
            if (clientData !== undefined) {
                return route.webSocketRouteManager.handleError(
                    error,
                    route.webSocketRouteManager,
                    clientData
                );
            }
        }
    }

    public getRouteByPath(path: string): WebSocketManagedRoute | undefined {
        return this._getByPath(path);
    }

    public getRouteByClient(client: TcpSocket): WebSocketManagedRoute | undefined {
        return this._getByClient(client);
    }

    protected _getByPath(path: string): WebSocketManagedRoute | undefined {
        return this._routes
            .find(route => Path.matchGenericRoute(path, route.path))
        ;
    }

    protected _getByClient(client: TcpSocket): WebSocketManagedRoute | undefined {
        return this._routes
            .find((route) => route.webSocketRouteManager.isWebSocketClient(client))
        ;
    }

    protected _defaultNotFoundHandler(
        request: HTTPRequest,
        response: HTTPResponse
    ): HTTPResponse {
        response.headers.set("Content-Type", {
            type: "text/plain"
        });
        response.status = {
            code: 404,
            name: HTTP_STATUS_NAME[404]
        };
        return response;
    }

    protected _defaultHandshakeHandler(
        request: HTTPRequest,
        response: HTTPResponse
    ): WebSocketAcceptHandshake {
        return { acceptContext: undefined };
    }

}
