export type ClientOptions = {
    openSsl?: {
        paths: {
            clientKey?: string;
            clientCertificate?: string;
            serverCertificateAuthority?: string;
        }
    }
};
