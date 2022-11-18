import { RouterOptions } from ".";

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
};
