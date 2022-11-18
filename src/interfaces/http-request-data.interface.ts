import { HTTPMessageData } from ".";
import { HTTPMethod } from "../types";

export interface HTTPRequestData extends HTTPMessageData {
    resource: {
        method: HTTPMethod,
        path: string
    }
}
