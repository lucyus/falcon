import {
    createServer as createTcpServer,
    Server as TcpServer,
    Socket as TcpSocket
} from "net";
import {
    createServer as createTlsServer,
    Server as TlsServer,
    TLSSocket as TlsSocket
} from "tls";
import { readFileSync } from "fs";

import { ServerOptions } from "../../types";
import { HTTPRequest, HTTPResponse } from "../messages";
import { HTTP_STATUS_NAME } from "../../data";
import { Router } from "../router";
import { WebSocketMessenger } from "../utilities";
import { WebSocketRouter } from "../websocket";

 export class Server {

    protected _options: ServerOptions;
    protected _server: TcpServer | TlsServer;
    protected _clients: TcpSocket[];

    protected _router: Router;
    protected _webSocketRouter: WebSocketRouter;

    public set port(port: number) {
        this._options.port = port;
    }

    public set host(host: string) {
        this._options.host = host;
    }

    public get router(): Router {
        return this._router;
    }

    public get webSocketRouter(): WebSocketRouter {
        return this._webSocketRouter;
    }

    constructor(options?: ServerOptions) {
        this._clients = [];
        this._router = new Router(options?.router);
        this._webSocketRouter = new WebSocketRouter(options?.webSocketRouter);
        this._options = {
            host: options?.host,
            port: options?.port,
            timeout: options?.timeout,
            openSsl: options?.openSsl,
            onError: options?.onError
        };
        if (this._options.openSsl !== undefined) {
            this._server = createTlsServer({
                key: readFileSync(this._options.openSsl.paths.serverKey),
                cert: readFileSync(this._options.openSsl.paths.serverCertificate),
                // set to true if using client certificate authentication:
                requestCert: this._options.openSsl.enableClientCertificateAuthentication,
                // set to true if above is set to true and client certificate is self-signed:
                ca: (
                    this._options.openSsl.paths.clientCertificateAuthority ?
                        readFileSync(this._options.openSsl.paths.clientCertificateAuthority) :
                        undefined
                )
            }, this._attachListeners.bind(this));
        }
        else {
            this._server = createTcpServer(this._attachListeners.bind(this));
        }
    }

    public async start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._server.listen(
                this._options.port ?? (
                    (this._options.openSsl !== undefined) ? 443 : 80
                ),
                this._options.host,
                resolve
            );
        });
    }

    public async stop(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._server.close((error?: Error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    protected _attachListeners(socket: TcpSocket): void {
        if (!this._clients.includes(socket)) {
            this._clients.push(socket);
        }
        if (this._options.timeout !== undefined) {
            socket.setTimeout(this._options.timeout);
        }
        socket.on("data", async (data: Buffer) => {
            try {
                const request = new HTTPRequest(
                    data,
                    this._options.encoding?.server
                );
                if (request.headers.get("Connection") !== "close") {
                    socket.setKeepAlive(true);
                }
                const initialResponse = new HTTPResponse({
                    protocol: request.parsed.protocol,
                    response: {
                        status: {
                            code: 501,
                            name: HTTP_STATUS_NAME[501]
                        }
                    }
                });
                const websocketUpgrade = request.headers
                    .get("Upgrade")
                    ?.find((upgrade) => upgrade.protocol.name.toLowerCase() === "websocket")
                ;
                const websocketKey = request.headers.get("Sec-WebSocket-Key");
                if (
                    websocketUpgrade !== undefined &&
                    websocketKey !== undefined
                ) {
                    const finalResponse = await this._webSocketRouter.handleHandshakeRequest(
                        request,
                        initialResponse,
                        { client: socket, webSocketKey: websocketKey }
                    );
                    this._send(finalResponse, socket)
                        .then(async () => {
                            await this._webSocketRouter.handleHandshakeEstablished(socket);
                        })
                    ;
                }
                else {
                    const finalResponse = await this._router.handle(
                        request,
                        initialResponse
                    );
                    this._send(finalResponse, socket);
                }
            }
            catch (httpParsingError: any) {
                try {
                    const requestMessage = WebSocketMessenger.decode(
                        Buffer.from(data.toString("binary"), "binary")
                    );
                    const responseMessage = await this.webSocketRouter.handleMessage(
                        requestMessage,
                        socket
                    );
                    if (responseMessage !== undefined) {
                        const responseBuffer = WebSocketMessenger.encode(responseMessage);
                        this._sendBinary(responseBuffer, socket);
                    }
                    return;
                }
                catch (websocketParsingError: any) {
                    if (websocketParsingError.name === "WebSocketEndError") {
                        const webSocketRoute = this.webSocketRouter.getRouteByClient(socket);
                        if (webSocketRoute !== undefined) {
                            if (webSocketRoute.webSocketRouteManager.isWebSocketClientClosing(socket)) {
                                webSocketRoute.webSocketRouteManager.unregister(socket);
                                socket.end(() => {
                                    socket.destroy();
                                });
                            }
                            else {
                                webSocketRoute.webSocketRouteManager.close(socket)
                                .then(() => {
                                    webSocketRoute.webSocketRouteManager.unregister(socket);
                                })
                                .catch(() => { })
                                .finally(() => {
                                    socket.end(() => {
                                        socket.destroy();
                                    });
                                });
                            }
                        }
                        else {
                            socket.end(() => {
                                socket.destroy();
                            });
                        }
                        return;
                    }
                    if (websocketParsingError.name === "WebSocketPayloadOverflowError") {
                        const responseMessage = await this.webSocketRouter.handleError(
                            websocketParsingError,
                            socket
                        );
                        if (responseMessage !== undefined) {
                            const responseBuffer = WebSocketMessenger.encode(responseMessage);
                            this._sendBinary(responseBuffer, socket);
                        }
                        return;
                    }
                }
                const internalServerErrorResponse = new HTTPResponse({
                    protocol: {
                        name: "HTTP",
                        version: {
                            major: 1,
                            minor: 1
                        }
                    },
                    response: {
                        status: {
                            code: 500,
                            name: HTTP_STATUS_NAME[500]
                        }
                    }
                });
                await this._unexpectedErrorHandler(
                    httpParsingError,
                    internalServerErrorResponse,
                    socket
                );
            }
        });
        socket.on("close", (hadError: boolean) => {
            const clientIndex = this._clients.indexOf(socket);
            if (clientIndex !== -1) {
                this._clients.splice(clientIndex, 1);
            }
            const webSocketRoute = this.webSocketRouter.getRouteByClient(socket);
            if (webSocketRoute !== undefined) {
                webSocketRoute.webSocketRouteManager.unregister(socket);
            }
        });
        socket.on("error", (error: Error) => { });
        socket.on("timeout", () => {
            const webSocketRoute = this.webSocketRouter.getRouteByClient(socket);
            if (webSocketRoute !== undefined) {
                webSocketRoute.webSocketRouteManager.close(socket);
                setTimeout(() => {
                    if (webSocketRoute.webSocketRouteManager.isWebSocketClient(socket)) {
                        socket.end(() => {
                            socket.destroy();
                        });
                    }
                }, 5000);
            }
            else {
                socket.end(() => {
                    socket.destroy();
                });
            }
        });
    }

    protected async _send(response: HTTPResponse, destination: TcpSocket): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const encoding: BufferEncoding = this._options.encoding?.client ?? "utf-8";
            destination.write(
                response.toBuffer(),
                encoding,
                (error?: Error) => {
                    if (error !== undefined) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                }
            );
        });
    }

    protected async _sendBinary(data: Buffer, destination: TcpSocket): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            destination.write(data, (error?: Error) => {
                if (error !== undefined) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    protected async _unexpectedErrorHandler(
        error: Error,
        response: HTTPResponse,
        socket: TcpSocket
    ) {
        if (this._options.onError) {
            let errorResponseToSend: HTTPResponse = response;
            try {
                errorResponseToSend = await this._options.onError(error, response, socket);
                if (!(errorResponseToSend instanceof HTTPResponse)) {
                    errorResponseToSend = response;
                }
            }
            catch (subError) {
                console.error(error);
                console.error(subError);
            }
            await this._send(errorResponseToSend, socket);
        }
        else {
            console.error(error);
            await this._send(response, socket);
        }
    }

}
