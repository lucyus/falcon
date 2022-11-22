import { Socket as TcpSocket } from "net";
import { WebSocketErrorHandler, WebSocketJoinHandler, WebSocketManagerOptions, WebSocketMessageHandler } from "../../types";
import { WebSocketMessenger } from "./websocket-messenger";

export class WebSocketManager {

    public errorHandler: WebSocketErrorHandler;
    public joinHandler: WebSocketJoinHandler;
    public messageHandler: WebSocketMessageHandler;

    protected _clients: TcpSocket[];
    protected _clientsClosing: TcpSocket[];
    protected _isHandlingHandshakes: boolean;

    public get clients(): TcpSocket[] {
        return [...this._clients];
    }

    public get isHandlingHandshakes(): boolean {
        return this._isHandlingHandshakes;
    }

    public constructor(options?: WebSocketManagerOptions) {
        this._clients = [];
        this._clientsClosing = [];
        this.errorHandler = options?.errorHandler ?? (() => { });
        this.joinHandler = options?.joinHandler ?? (() => { });
        this.messageHandler = options?.messageHandler ?? (() => { });
        this._isHandlingHandshakes = options?.errorHandler !== undefined ||
            options?.joinHandler !== undefined ||
            options?.messageHandler !== undefined
        ;
    }

    public enableHandshakeHandling(): void {
        this._isHandlingHandshakes = true;
    }

    public disableHandshakeHandling(): void {
        this._isHandlingHandshakes = false;
    }

    public isWebSocketClient(client: TcpSocket): boolean {
        return this._clients.includes(client);
    }

    public isWebSocketClientClosing(client: TcpSocket): boolean {
        return this._clientsClosing.includes(client);
    }

    public async register(client: TcpSocket): Promise<void> {
        if (this.isWebSocketClient(client)) {
            return;
        }
        this._clients.push(client);
        const responseMessage = await this.joinHandler(this, client);
        if (responseMessage !== undefined) {
            await this.send(responseMessage, client);
        }
    }

    public unregister(client: TcpSocket): void {
        const clientIndex = this._clients.indexOf(client);
        if (clientIndex === -1) {
            return;
        }
        this._clients.splice(clientIndex, 1);
        this._clientsClosing.splice(this._clientsClosing.indexOf(client), 1);
    }

    public async send(message: string, client: TcpSocket): Promise<void> {
        if (!this.isWebSocketClient(client)) {
            return;
        }
        const textFrame = WebSocketMessenger.encode(message);
        return new Promise<void>((resolve, reject) => {
            client.write(textFrame, (error?: Error) => {
                if (error !== undefined) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }

    public async close(client: TcpSocket): Promise<void> {
        if (!this.isWebSocketClient(client)) {
            return;
        }
        const closeFrame = WebSocketMessenger.encodeClose();
        return new Promise<void>((resolve, reject) => {
            client.write(closeFrame, (error?: Error) => {
                if (error !== undefined) {
                    reject(error);
                    return;
                }
                this._clientsClosing.push(client);
                resolve();
            });
        });
    }

    public async sendAll(message: string): Promise<void[]> {
        const textFrame = WebSocketMessenger.encode(message);
        const promises: Promise<void>[] = [];
        for (const client of this._clients) {
            promises.push(new Promise<void>((resolve, reject) => {
                client.write(textFrame, (error?: Error) => {
                    if (error !== undefined) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            }));
        }
        return Promise.all(promises);
    }

    public async closeAll(): Promise<void[]> {
        const closeFrame = WebSocketMessenger.encodeClose();
        const promises: Promise<void>[] = [];
        for (const client of this._clients) {
            promises.push(new Promise<void>((resolve, reject) => {
                client.write(closeFrame, (error?: Error) => {
                    if (error !== undefined) {
                        reject(error);
                        return;
                    }
                    this._clientsClosing.push(client);
                    resolve();
                });
            }));
        }
        const allPromises = Promise.all(promises);
        allPromises.then(() => {
            this._clients = [];
        });
        return allPromises;
    }

}
