import { HTTPMethod } from "./http-method.type";

export type HTTPMessageOptions = {
    protocol?: {
        name?: string;
        version?: {
            major?: number;
            minor?: number;
        }
    }
    request?: {
        resource?: {
            method?: HTTPMethod;
            path?: string;
        },
    },
    response?: {
        status?: {
            code?: number;
            name?: string;
        },
    },
    socket?: {
        timeout?: number;
        maximumRequestCount?: number;
    }
};
