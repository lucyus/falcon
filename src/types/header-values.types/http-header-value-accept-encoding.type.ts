import { ContentEncoder } from "../content-encoder.type";

export type HTTPHeaderValueAcceptEncoding = {
    type: '*' | ContentEncoder,
    qualityFactor: number
}[];
