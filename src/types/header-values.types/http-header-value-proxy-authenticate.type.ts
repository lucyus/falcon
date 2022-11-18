import { AuthenticationScheme } from "../../enums";


export type HTTPHeaderValueProxyAuthenticate = {
    authenticationScheme: AuthenticationScheme,
    parameters: Record<string, string | undefined>,
    authData?: string, // only used in Negotiate scheme
};
