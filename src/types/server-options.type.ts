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
    openSsl?: {
        enableClientCertificateAuthentication?: boolean;
        paths: {
            serverKey: string;
            serverCertificate: string;
            clientCertificateAuthority?: string;
        }
    };
    http?: {
        encoding?: {
            client?: BufferEncoding;
            server?: BufferEncoding;
        };
        maxRequestLength?: number;
        onError?: (
            error: Error,
            response: HTTPResponse,
            socket: TcpSocket
        ) => HTTPResponse | Promise<HTTPResponse>;
        router?: RouterOptions;
    };
    webSocket?: {
        maxPayloadLength?: number;
        router?: WebSocketRouterOptions;
    };
};
