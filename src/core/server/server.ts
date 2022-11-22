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
import { createHash } from "crypto";

import { RequestHandler, ServerOptions } from "../../types";
import { HTTPRequest, HTTPResponse } from "../messages";
import { HTTP_HEADER_BEAUTIFIER, HTTP_STATUS_NAME } from "../../data";
import { Router } from "../router";
import { WebSocketManager, WebSocketMessenger } from "../utilities";
import { WebSocketEndError, WebSocketPayloadOverflowError } from "../../errors";

 export class Server {

    protected _options: ServerOptions;
    protected _server: TcpServer | TlsServer;
    protected _clients: TcpSocket[];
    protected _webSocketManager: WebSocketManager;

    protected _router: Router;

    public set port(port: number) {
        this._options.port = port;
    }

    public set host(host: string) {
        this._options.host = host;
    }

    public get router(): Router {
        return this._router;
    }

    public get webSocketManager(): WebSocketManager {
        return this._webSocketManager;
    }

    constructor(options?: ServerOptions) {
        this._clients = [];
        this._webSocketManager = new WebSocketManager({
            errorHandler: options?.webSocket?.errorHandler,
            joinHandler: options?.webSocket?.joinHandler,
            messageHandler: options?.webSocket?.messageHandler,
        });
        this._router = new Router(options?.router);
        this._options = {
            host: options?.host,
            port: options?.port,
            timeout: options?.timeout,
            openSsl: options?.openSsl
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
        socket.on("data", async (data: Buffer | string) => {
            try {
                const request = new HTTPRequest(
                    data.toString(this._options.encoding?.server ?? "utf-8")
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
                    this.webSocketManager.isHandlingHandshakes &&
                    websocketUpgrade !== undefined &&
                    websocketKey !== undefined
                ) {
                    const finalResponse = initialResponse;
                    finalResponse.headers.set("Upgrade", [
                        {
                            protocol: {
                                name: "websocket"
                            }
                        }
                    ]);
                    finalResponse.headers.set("Connection", ["Upgrade"]);
                    finalResponse.headers.set(
                        "Sec-WebSocket-Accept",
                        createHash("sha1")
                            .update(websocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
                            .digest("base64")
                    );
                    finalResponse.status = {
                        code: 101,
                        name: HTTP_STATUS_NAME[101]
                    };
                    this.webSocketManager.register(socket);
                    this._send(finalResponse, socket);
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
                    const responseMessage = await this.webSocketManager.messageHandler(
                        requestMessage,
                        this.webSocketManager,
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
                        if (this.webSocketManager.isWebSocketClient(socket)) {
                            if (this.webSocketManager.isWebSocketClientClosing(socket)) {
                                this.webSocketManager.unregister(socket);
                                socket.end(() => {
                                    socket.destroy();
                                });
                            }
                            else {
                                this.webSocketManager.close(socket)
                                .then(() => {
                                    this.webSocketManager.unregister(socket);
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
                        const responseMessage = await this.webSocketManager.errorHandler(
                            websocketParsingError,
                            this.webSocketManager,
                            socket
                        );
                        if (responseMessage !== undefined) {
                            const responseBuffer = WebSocketMessenger.encode(responseMessage);
                            this._sendBinary(responseBuffer, socket);
                        }
                        return;
                    }
                }
                const badRequestResponse = new HTTPResponse({
                    protocol: {
                        name: "HTTP",
                        version: {
                            major: 1,
                            minor: 1
                        }
                    },
                    response: {
                        status: {
                            code: 400,
                            name: HTTP_STATUS_NAME[400]
                        }
                    }
                });
                this._send(badRequestResponse, socket);
            }
        });
        socket.on("close", (hadError: boolean) => {
            const clientIndex = this._clients.indexOf(socket);
            if (clientIndex !== -1) {
                this._clients.splice(clientIndex, 1);
            }
            this.webSocketManager.unregister(socket);
        });
        socket.on("error", (error: Error) => { });
        socket.on("timeout", () => {
            if (this.webSocketManager.isWebSocketClient(socket)) {
                this.webSocketManager.close(socket);
                setTimeout(() => {
                    if (this.webSocketManager.isWebSocketClient(socket)) {
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
                response.toString(),
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

}
