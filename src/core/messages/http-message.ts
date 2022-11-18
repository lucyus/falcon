import { HTTPMessageType } from "../../enums";
import { HTTPMessageData, HTTPRequestData, HTTPResponseData } from "../../interfaces";
import { HTTPMessageOptions } from "../../types";
import { HTTPParser } from "../parser";
import { HTTPTokenizer } from "../tokenizer";
import { BodyManager, HeaderManager } from "../utilities";

export abstract class HTTPMessage {

    protected _parsed: HTTPMessageData;
    protected abstract _type: HTTPMessageType;
    protected _headerManager: HeaderManager;
    protected _bodyManager: BodyManager;

    public get parsed(): HTTPMessageData {
        return this._parsed;
    }

    public get type(): HTTPMessageType {
        return this._type;
    }

    public get headers(): HeaderManager {
        return this._headerManager;
    }

    public get body(): BodyManager {
        return this._bodyManager;
    }

    constructor(messageOrOptions?: string | HTTPMessageOptions) {
        if (typeof messageOrOptions === "string") {
            const message = messageOrOptions;
            const tokens = HTTPTokenizer.tokenize(message);
            this._parsed = HTTPParser.parseToObject(tokens);
            this._headerManager = new HeaderManager(this._parsed.headers);
            this._bodyManager = new BodyManager(this._parsed.body);
        }
        else {
            const options = messageOrOptions;
            this._parsed = {
                protocol: {
                    name: options?.protocol?.name ?? "HTTP",
                    version: {
                        major: options?.protocol?.version?.major ?? 1,
                        minor: options?.protocol?.version?.minor ?? 1
                    }
                },
                headers: [],
                body: ""
            };
            this._headerManager = new HeaderManager();
            this._bodyManager = new BodyManager();
        }
    }

    public abstract toString(): string;

}
