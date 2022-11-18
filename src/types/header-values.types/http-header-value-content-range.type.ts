export type HTTPHeaderValueContentRange = {
    unit: string,
    range: "*" | {
        start: number,
        end: number
    },
    totalSize: number
};
