export class BodyManager {

    protected _value: string;

    public constructor(raw?: string) {
        this._value = raw || "";
    }

    public get content(): string {
        return this.toString();
    }
    public set content(body: string) {
        this._value = body;
    }

    public toString(): string {
        return this._value;
    }

}
