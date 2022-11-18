import { ContentEncoder } from "../content-encoder.type";

export type HTTPHeaderValueTE = {
    type: ContentEncoder | 'trailers' | 'chunked',
    qualityFactor: number
}[];
