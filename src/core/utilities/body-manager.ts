export class BodyManager {

    protected _value: Buffer;

    public constructor(raw?: Buffer) {
        this._value = raw || Buffer.from("");
    }

    public get content(): Buffer {
        return Buffer.from(this._value);
    }
    public set content(body: Buffer | string) {
        this._value = Buffer.from(body);
    }

    public get length(): number {
        return this._value.length;
    }

    public toString(encoding: BufferEncoding = "utf8"): string {
        return this._value.toString(encoding);
    }

}
