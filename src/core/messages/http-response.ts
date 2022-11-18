import { HTTPMessage } from ".";
import { HTTP_STATUS_NAME } from "../../data";
import { HTTPMessageType } from "../../enums";
import { HTTPResponseData } from "../../interfaces";
import { HTTPMessageOptions } from "../../types";

export class HTTPResponse extends HTTPMessage {

    protected _parsed!: HTTPResponseData;
    protected _type: HTTPMessageType.RESPONSE;

    public set status(status: { code: number; name: string }) {
        this._parsed.status = status;
    }

    constructor(messageOrOptions?: string | HTTPMessageOptions) {
        super(messageOrOptions);
        this._type = HTTPMessageType.RESPONSE;
        if (typeof messageOrOptions === "string") {
            return;
        }
        const options = messageOrOptions;
        this._parsed.status = {
            code: options?.response?.status?.code ?? 200,
            name: options?.response?.status?.name ?? HTTP_STATUS_NAME[200]
        };
        this.headers.set("Connection", [
            "Keep-Alive"
        ]);
        this.headers.set("Keep-Alive", {
            timeout: options?.socket?.timeout ?? 10 * 1000,
            maximumRequestCount: options?.socket?.maximumRequestCount
        });
        this.headers.set("Access-Control-Allow-Origin", "*");
        this.headers.set("Access-Control-Allow-Headers", [
            "*"
        ]);
        this.headers.set("Access-Control-Allow-Methods", [
            "*"
        ]);
        this.headers.set("Content-Disposition", {
            disposition: "inline"
        });
        this.headers.set("Content-Type", {
            type: "application/octet-stream"
        });
        this.headers.set("Content-Encoding", [
            "identity"
        ]);
        this.headers.set("Content-Length", this.body.toString().length);
        this.headers.set("Server", "Lucyus (HTTP Server)");
        this.headers.set("Date", new Date());
    }

    public toString(): string {
        let result = `${this._parsed.protocol.name}/`;
        result += `${this._parsed.protocol.version.major}.`;
        result += `${this._parsed.protocol.version.minor} `;
        result += `${this._parsed.status.code} `;
        result += `${this._parsed.status.name}\r\n`;
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
