import { Charset } from "../charset.type";

export type HTTPHeaderValueAcceptCharset = {
    type: '*' | Charset,
    qualityFactor: number
}[];
