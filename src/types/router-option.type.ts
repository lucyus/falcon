import { RequestHandler, Route } from ".";

export type RouterOptions = {
    routes?: Route[];
    routeNotFoundHandler?: RequestHandler;
};
