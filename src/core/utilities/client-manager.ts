import { Socket as TcpSocket } from 'net';
import { ChunkStorage } from './chunk-storage';

export class ClientManager {

    protected _map: Map<TcpSocket, ChunkStorage>;

    public constructor() {
        this._map = new Map<TcpSocket, ChunkStorage>();
    }

    public get(client: TcpSocket): ChunkStorage | undefined {
        return this._map.get(client);
    }

    public has(client: TcpSocket): boolean {
        return this._map.has(client);
    }

    public register(client: TcpSocket): ChunkStorage {
        const storage = new ChunkStorage();
        this._map.set(client, storage);
        return storage;
    }

    public unregister(client: TcpSocket): void {
        this._map.delete(client);
    }

}
