export class Path {

    public static matchGenericRoute(path: string, genericPath: string): boolean {
        const genericPathPatternified = genericPath
            .replace(/\//g, '\\/')
            .replace(/{[%a-zA-Z0-9_-]*}/g, '[%a-zA-Z0-9_-]*')
        ;
        const genericPathPattern = new RegExp(`^${genericPathPatternified}$`);
        return genericPathPattern.test(path);
    }

    public static buildParams(
        path: string,
        genericPath: string
    ): { [key: string]: string } {
        const params: { [key: string]: string } = {};
        const pathParts = path.split('/');
        const genericPathParts = genericPath.split('/');
        for (let i = 0; i < pathParts.length; i++) {
            if (
                genericPathParts[i].startsWith('{') &&
                genericPathParts[i].endsWith('}')
            ) {
                const paramName = genericPathParts[i].slice(1, -1);
                params[paramName] = decodeURIComponent(pathParts[i]);
            }
        }
        return params;
    }

    public static buildQueryParams(path: string): { [key: string]: string } {
        const queryParams: { [key: string]: string } = {};
        const pathParts = path.split('?');
        if (pathParts.length === 1) {
            return queryParams;
        }
        const rawQueryParams = pathParts[1];
        const queryParamsParts = rawQueryParams.split('&');
        for (const rawQueryParam of queryParamsParts) {
            const keyValue = rawQueryParam.split('=');
            const queryParamKey = decodeURIComponent(keyValue[0]);
            const queryParamValue = decodeURIComponent(keyValue[1]);
            queryParams[queryParamKey] = queryParamValue;
        }
        return queryParams;
    }

}
