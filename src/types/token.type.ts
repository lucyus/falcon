import { TokenType } from "../enums"

export type Token = {
    type: TokenType,
    value: string,
    index: {
        start: number,
        end: number
    }
}
