import { HTTPMessage } from ".";
import { HTTPMessageType } from "../../enums";
import { HTTPRequestData } from "../../interfaces";
import { HTTPMessageOptions } from "../../types";

export class HTTPRequest extends HTTPMessage {

    protected _parsed!: HTTPRequestData;
    protected _type: HTTPMessageType.REQUEST;

    public get parsed(): HTTPRequestData {
        return this._parsed;
    }

    constructor(messageOrOptions?: string | HTTPMessageOptions) {
        super(messageOrOptions);
        this._type = HTTPMessageType.REQUEST;
        if (typeof messageOrOptions === "string") {
            return;
        }
        const options = messageOrOptions;
        this._parsed.resource = {
            method: options?.request?.resource?.method ?? "GET",
            path: options?.request?.resource?.path ?? "/"
        };
        this.headers.set("Connection", [
            "Keep-Alive"
        ]);
        this.headers.set("Keep-Alive", {
            timeout: options?.socket?.timeout ?? 10 * 1000,
            maximumRequestCount: options?.socket?.maximumRequestCount
        });
        this.headers.set("Accept", [{
            type: "*/*",
            qualityFactor: 1
        }]);
        this.headers.set("Accept-Charset", [{
            type: "*",
            qualityFactor: 1
        }]);
        this.headers.set("Accept-Encoding", [{
            type: "*",
            qualityFactor: 1
        }]);
        this.headers.set("Content-Type", {
            type: "application/octet-stream"
        });
        this.headers.set("Content-Encoding", [
            "identity"
        ]);
        this.headers.set("Content-Length", this.body.toString().length);
        this.headers.set("User-Agent", {
            product: {
                name: "Lucyus",
                version: "0.0"
            },
            details: "HTTP Client"
        });
        this.headers.set("Date", new Date());
    }

    public toString(): string {
        let result = `${this._parsed.resource.method} `;
        result += `${this._parsed.resource.path} `;
        result += `${this._parsed.protocol.name}/`;
        result += `${this._parsed.protocol.version.major}.`;
        result += `${this._parsed.protocol.version.minor}\r\n`;
        const body = this.body.toString();
        this.headers.set("Content-Length", body.length);
        if (this.headers.get("Date") !== undefined) {
            this.headers.set("Date", new Date());
        }
        const simpleHeaders = this.headers.getAllStringified();
        const trailers = this.headers.get("Trailer");
        const trailerHeaders: Record<string, string> = {};
        if (trailers !== undefined) {
            for (const trailer of trailers) {
                if (simpleHeaders[trailer]) {
                    trailerHeaders[trailer] = simpleHeaders[trailer];
                    delete simpleHeaders[trailer];
                }
            }
        }
        for (const header in simpleHeaders) {
            result += `${header}: ${simpleHeaders[header]}\r\n`;
        }
        result += "\r\n";
        if (body.length > 0) {
            result += body;
            result += "\r\n";
        }
        for (const header in trailerHeaders) {
            result += `${header}: ${trailerHeaders[header]}\r\n`;
        }
        if (Object.keys(trailerHeaders).length > 0) {
            result += "\r\n";
        }
        return result;
    }

}
