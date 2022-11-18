export type HTTPHeaderValueAltSvc = (
    {
        clear: true
    } |
    {
        type: string,
        host: string,
        availableFor: number,
        persist: boolean
    }[]
);
