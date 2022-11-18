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

import { RequestHandler, ServerOptions } from "../../types";
import { HTTPRequest, HTTPResponse } from "../messages";
import { HTTP_HEADER_BEAUTIFIER, HTTP_STATUS_NAME } from "../../data";
import { Router } from "../router";

 export class Server {

    protected _options: ServerOptions;
    protected _server: TcpServer | TlsServer;
    protected _socket: TcpSocket | null;

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

    constructor(options?: ServerOptions) {
        this._socket = null;
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
        this._socket = socket;
        this._socket.setEncoding(this._options.encoding?.server ?? "utf-8");
        this._socket.setDefaultEncoding(this._options.encoding?.client ?? "utf-8");
        if (this._options.timeout !== undefined) {
            this._socket.setTimeout(this._options.timeout);
        }
        this._socket.on("data", async (data: Buffer) => {
            try {
                const request = new HTTPRequest(data.toString());
                if (request.headers.get("Connection") !== "close") {
                    this._socket?.setKeepAlive(true);
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
                const finalResponse = await this._router.handle(
                    request,
                    initialResponse
                );
                this._send(finalResponse);
            }
            catch (error: any) {
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
                this._send(badRequestResponse);
            }
        });
        this._socket.on("close", (hadError: boolean) => { });
        this._socket.on("error", (error: Error) => { });
        this._socket.on("timeout", () => {
            this._socket?.end(() => {
                this._socket?.destroy();
            });
        });
    }

    protected _send(response: HTTPResponse): void {
        if (this._socket !== null) {
            const encoding: BufferEncoding = this._options.encoding?.server ?? "utf-8";
            this._socket.write(response.toString(), encoding);
            this._socket.pipe(this._socket);
        }
    }

}
