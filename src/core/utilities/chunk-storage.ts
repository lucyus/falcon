import { ChunkStoragePolicy } from "../../types";

export class ChunkStorage {

    protected _chunks: Buffer[];
    protected _chunkPolicy: ChunkStoragePolicy | undefined;

    public get chunks(): Buffer[] {
        return this._chunks;
    }

    public set chunks(chunks: Buffer[]) {
        this._chunks = chunks;
    }

    public get length(): number {
        let length = 0;
        for (const chunk of this.chunks) {
            length += chunk.length;
        }
        return length;
    }

    public get policy(): ChunkStoragePolicy | undefined {
        return this._chunkPolicy;
    }

    public set policy(policy: ChunkStoragePolicy | undefined) {
        this._chunkPolicy = policy;
    }

    public constructor() {
        this._chunks = [];
        this._chunkPolicy = undefined;
    }

    public push(chunk: Buffer): void {
        this._chunks.push(chunk);
    }

    public clear(): void {
        this._chunks = [];
        this._chunkPolicy = undefined;
    }

}
