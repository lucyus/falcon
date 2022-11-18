import { HTTP_HEADERS } from "../../data";
import { HTTPHeader } from "../../types";

 export class StringValidator {

    public static isAlpha(string: string): boolean {
        return /^[a-zA-Z]+$/.test(string);
    }

    public static isStandardHttpHeaderName(string: string): string is HTTPHeader {
        return (HTTP_HEADERS as string[]).includes(string);
    }

}
