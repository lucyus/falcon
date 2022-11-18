import { AuthenticationScheme } from "../../enums";
import { Charset } from "../charset.type";

export type HTTPHeaderValueWWWAuthenticate = {
    authenticationScheme: AuthenticationScheme,
    parameters: Record<string, string | undefined>,
    authData?: string, // only used in Negotiate scheme
};
