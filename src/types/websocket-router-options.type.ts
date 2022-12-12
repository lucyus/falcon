import { WebSocketRoute } from ".";
import { RequestHandler } from "./request-handler.type";

export type WebSocketRouterOptions = {
    routes?: WebSocketRoute[];
    routeNotFoundHandler?: RequestHandler;
};
