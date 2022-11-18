export type HTTPHeaderValueContentDisposition = (
    {
        disposition: 'inline'
    } |
    {
        disposition: 'attachment',
        fileName?: string
    } |
    {
        disposition: 'form-data',
        name: string,
        fileName?: string
    }
);
