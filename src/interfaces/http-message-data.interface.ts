export interface HTTPMessageData {
    protocol: {
        name: string,
        version: {
            major: number,
            minor: number
        }
    },
    headers: { name: string, value: string }[],
    body: string
}
