import { HTTPHeader } from "../http-header.type";

export type HTTPHeaderValueNEL = {
    report: {
        to: string,
        duration: number,
        successfulRequests: boolean,
        failedRequests: boolean,
        includingSubdomains: boolean,
        requestHeaders: HTTPHeader[],
        responseHeaders: HTTPHeader[],
    }
};
