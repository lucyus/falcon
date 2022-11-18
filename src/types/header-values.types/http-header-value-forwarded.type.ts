export type HTTPHeaderValueForwarded = {
    by?: 'unknown' | 'secret' | 'hidden' | string,
    for?: 'unknown' | 'secret' | 'hidden' | string,
    host?: string,
    proto?: 'http' | 'https'
}[];
