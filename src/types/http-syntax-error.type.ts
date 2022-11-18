import { HTTPSyntaxErrorReasonType } from "../enums"

export type HTTPSyntaxErrorDetailsType = {
    type: HTTPSyntaxErrorReasonType,
    location: {
        line: number,
        column: number
    }
    message?: string,
};
