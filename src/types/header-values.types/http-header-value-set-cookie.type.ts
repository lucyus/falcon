export type HTTPHeaderValueSetCookie = {
    name: string,
    value: string,
    isSecure?: boolean,
    isHttpOnly?: boolean,
    expires?: Date,
    maxAge?: number,
    domain?: string,
    path?: string,
    sameSite?: 'Strict' | 'Lax' | 'None'
};
