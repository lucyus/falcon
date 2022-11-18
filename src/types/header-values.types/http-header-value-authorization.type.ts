import { AuthenticationScheme } from "../../enums";


export type HTTPHeaderValueAuthorization = {
    authenticationScheme: AuthenticationScheme,
    parameters: Record<string, string | undefined>,
    credentials?: string, // only used in Basic and Bearer schemes
};
