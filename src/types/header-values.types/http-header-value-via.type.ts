export type HTTPHeaderValueVia = {
    protocol: {
        name?: string,
        version: {
            major: number,
            minor: number
        }
    },
    proxy: string
}[];
