import { Socket as TcpSocket } from "net";
import {
    WebSocketErrorHandler,
    WebSocketJoinHandler,
    WebSocketMessageHandler,
    WebSocketClientData,
    WebSocketRouteManagerOptions,
    WebSocketLeaveHandler
} from "../../../types";
import { WebSocketMessenger } from "../../utilities";

export class WebSocketRouteManager {

    public handleError: WebSocketErrorHandler;
    public handleJoin: WebSocketJoinHandler;
    public handleLeave: WebSocketLeaveHandler;
    public handleMessage: WebSocketMessageHandler;

    protected _clients: WebSocketClientData[];
    protected _clientsClosing: WebSocketClientData[];

    public get clients(): WebSocketClientData[] {
        return [...this._clients];
    }

    public constructor(options?: WebSocketRouteManagerOptions) {
        this._clients = [];
        this._clientsClosing = [];
        this.handleError = options?.onError ?? (() => { });
        this.handleJoin = options?.onJoin ?? (() => { });
        this.handleLeave = options?.onLeave ?? (() => { });
        this.handleMessage = options?.onMessage ?? (() => { });
    }

    public getWebSocketClientData(client: TcpSocket): WebSocketClientData | undefined {
        return this._clients.find((clientData) => clientData.client === client);
    }

    public isWebSocketClient(client: TcpSocket): boolean {
        return this.getWebSocketClientData(client) !== undefined;
    }

    public getClosingWebSocketClientData(client: TcpSocket): WebSocketClientData | undefined {
        return this._clientsClosing.find((clientData) => clientData.client === client);
    }

    public isWebSocketClientClosing(client: TcpSocket): boolean {
        return this.getClosingWebSocketClientData(client) !== undefined;
    }

    public async register(webSocketRouteData: WebSocketClientData): Promise<void> {
        if (this.isWebSocketClient(webSocketRouteData.client)) {
            return;
        }
        this._clients.push(webSocketRouteData);
    }

    public async unregister(client: TcpSocket): Promise<void> {
        const clientIndex = this._clients.findIndex((clientData) => clientData.client === client);
        if (clientIndex === -1) {
            return;
        }
        const clientData = this._clients[clientIndex];
        this._clients.splice(clientIndex, 1);
        await this.handleLeave(this, clientData);
        const clientClosingIndex = this._clientsClosing.findIndex((clientData) => clientData.client === client);
        this._clientsClosing.splice(clientClosingIndex, 1);
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
        const clientData = this.getWebSocketClientData(client);
        if (!clientData) {
            return;
        }
        const closeFrame = WebSocketMessenger.encodeClose();
        return new Promise<void>((resolve, reject) => {
            client.write(closeFrame, (error?: Error) => {
                if (error !== undefined) {
                    reject(error);
                    return;
                }
                this._clientsClosing.push(clientData);
                resolve();
            });
        });
    }

    public async sendAll(message: string): Promise<void[]> {
        const textFrame = WebSocketMessenger.encode(message);
        const promises: Promise<void>[] = [];
        for (const clientData of this._clients) {
            promises.push(new Promise<void>((resolve, reject) => {
                clientData.client.write(textFrame, (error?: Error) => {
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
        for (const clientData of this._clients) {
            promises.push(new Promise<void>((resolve, reject) => {
                clientData.client.write(closeFrame, (error?: Error) => {
                    if (error !== undefined) {
                        reject(error);
                        return;
                    }
                    this._clientsClosing.push(clientData);
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
