export type HTTPHeaderValueContentSecurityPolicy = {
    policies: (
        {
            name: 'child-src' |
                'connect-src' |
                'default-src' |
                'font-src' |
                'frame-src' |
                'img-src' |
                'manifest-src' |
                'media-src' |
                'object-src' |
                'prefetch-src' |
                'script-src' |
                'script-src-attr' |
                'script-src-elem' |
                'style-src' |
                'style-src-attr' |
                'style-src-elem' |
                'worker-src' |
                'base-uri' |
                'form-action' |
                'navigate-to'
            ,
            values: (
                'http' |
                'https' |
                'data' |
                'mediastream' |
                'blob' |
                'filesystem' |
                'self' |
                'unsafe-eval' |
                'unsafe-hashes' |
                'unsafe-inline' |
                'none' |
                'strict-dynamic' |
                'rreport-sample' |
                string
            )[]
        } |
        {
            name: 'frame-ancestors',
            values: (
                'http' |
                'https' |
                'data' |
                'mediastream' |
                'blob' |
                'filesystem' |
                'self' |
                'none'
            )[]
        } |
        {
            name: 'sandbox',
            values: (
                'allow-downloads' |
                'allow-downloads-without-user-activation' |
                'allow-forms' |
                'allow-modals' |
                'allow-orientation-lock' |
                'allow-pointer-lock' |
                'allow-popups' |
                'allow-popups-to-escape-sandbox' |
                'allow-presentation' |
                'allow-same-origin' |
                'allow-scripts' |
                'allow-storage-access-by-user-activation' |
                'allow-top-navigation' |
                'allow-top-navigation-by-user-activation'
            )[]
        } |
        {
            name: 'report-to',
            values: string[]
        } |
        {
            name: 'require-sri-for',
            values: ('script' | 'style')[]
        } |
        {
            name: 'require-trusted-types-for',
            values: ['script']
        } |
        {
            name: 'trusted-types',
            values: ('none' | 'allow-duplicates' | string)[]
        } |
        {
            name: 'upgrade-insecure-requests'
            values: never[]
        }
    )[]
};
