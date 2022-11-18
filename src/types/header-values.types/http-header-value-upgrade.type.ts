export type HTTPHeaderValueUpgrade = {
    protocol: {
        name: string,
        version?: {
            major: number,
            minor?: number
        }
    }
}[];
