export type HTTPHeaderValuePermissionsPolicy = {
    policies: {
        name: 'accelerometer' |
            'ambient-light-sensor' |
            'autoplay' |
            'battery' |
            'camera' |
            'display-capture' |
            'document-domain' |
            'encrypted-media' |
            'execution-while-not-rendered' |
            'execution-while-out-of-viewport' |
            'fullscreen' |
            'gamepad' |
            'geolocation' |
            'gyroscope' |
            'magnetometer' |
            'microphone' |
            'midi' |
            'navigation-override' |
            'payment' |
            'picture-in-picture' |
            'publickey-credentials-get' |
            'speaker-selection' |
            'sync-xhr' |
            'usb' |
            'screen-wake-lock' |
            'web-share' |
            'xr-spatial-tracking'
        ,
        value: '*' | 'self' | string
    }[]
};
