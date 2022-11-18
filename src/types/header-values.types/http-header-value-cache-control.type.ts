import { CacheExpirationPolicyName } from "..";

export type HTTPHeaderValueCacheControl = {
    location?: 'public' | 'private',
    cacheManagement?: 'no-cache' | 'no-store' | 'must-understand',
    expirationPolicies: {
        name: CacheExpirationPolicyName,
        value: number
    }[],
    cacheRevalidation?: 'must-revalidate' | 'proxy-revalidate' | 'immutable',
    transformHttpMessage?: 'no-transform',
    acceptResponse?: 'only-if-cached'
};
