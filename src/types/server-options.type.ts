import { Socket as TcpSocket } from "net";

import { HTTPResponse } from "../core";
import {
    RouterOptions,
    WebSocketRouterOptions
} from ".";

export type ServerOptions = {
    host?: string;
    port?: number;
    timeout?: number;
    encoding?: {
        client?: BufferEncoding;
        server?: BufferEncoding;
    };
    openSsl?: {
        enableClientCertificateAuthentication?: boolean;
        paths: {
            serverKey: string;
            serverCertificate: string;
            clientCertificateAuthority?: string;
        }
    },
    router?: RouterOptions;
    webSocketRouter?: WebSocketRouterOptions;
    onError?: (
        error: Error,
        response: HTTPResponse,
        socket: TcpSocket
    ) => HTTPResponse | Promise<HTTPResponse>;
};
