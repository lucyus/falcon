import { HTTPMessageData } from ".";

export interface HTTPResponseData extends HTTPMessageData {
    status: {
        code: number,
        name: string
    }
}
