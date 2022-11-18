import { MIMEType } from "../mime.type";

export type HTTPHeaderValueAccept = {
    type: '*/*' | MIMEType,
    qualityFactor: number
}[];
