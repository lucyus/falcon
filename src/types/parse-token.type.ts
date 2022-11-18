import { ParseTokenSuperType, ParseTokenType } from "../enums";

export type ParseToken = {
    superType: ParseTokenSuperType,
    type: ParseTokenType,
    value: string,
    index: {
        start: number,
        end: number
    },
    location: {
        line: number,
        column: number
    }
};
