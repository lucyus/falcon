import { HTTPRequest, HTTPResponse } from "../core";
import { RouteData } from ".";

export type RouterHandler = (
    request: HTTPRequest,
    reponse: HTTPResponse,
    routeData: RouteData
) => HTTPResponse | Promise<HTTPResponse>;
