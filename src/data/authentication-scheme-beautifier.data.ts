import { AuthenticationScheme } from "../enums";


export const AUTHENTICATION_SCHEME_BEAUTIFIER: Record<
    string,
    AuthenticationScheme | string
> = {
    "basic": AuthenticationScheme.BASIC,
    "bearer": AuthenticationScheme.BEARER,
    "digest": AuthenticationScheme.DIGEST,
    "hoba": AuthenticationScheme.HOBA,
    "mutual": AuthenticationScheme.MUTUAL,
    "nogotiate": AuthenticationScheme.NEGOTIATE,
    "oauth": AuthenticationScheme.OAUTH,
    "scram-sha-1": AuthenticationScheme.SCRAM_SHA_1,
    "scram-sha-256": AuthenticationScheme.SCRAM_SHA_256,
    "vapid": AuthenticationScheme.VAPID,
};
