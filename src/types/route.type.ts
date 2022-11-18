import { RouterHandler } from ".";
import { HTTPMethod } from "./http-method.type";

export type Route = {
    path: string;
    method: HTTPMethod;
    behavior: RouterHandler;
};
