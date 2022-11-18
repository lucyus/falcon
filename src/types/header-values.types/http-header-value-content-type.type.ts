import { Charset } from "../charset.type";
import { MIMEType } from "../mime.type";

export type HTTPHeaderValueContentType = {
    type: MIMEType,
    charset?: Charset,
    boundary?: string
};
