import { HTTP_STATUS_NAME } from "../../data";
import {
    HTTPMethod,
    RequestHandler,
    Route,
    RouteData,
    RouterHandler,
    RouterOptions
} from "../../types";
import { HTTPRequest, HTTPResponse } from "../messages";
import { Path } from "../utilities";

export class Router {

    protected _routes: Route[];
    protected _notFoundHandler: RouterHandler;

    constructor(routerOptions?: RouterOptions) {
        this._routes = [];
        this._notFoundHandler = this._defaultNotFoundHandler;
        if (routerOptions !== undefined) {
            if (routerOptions.routes !== undefined) {
                for (const route of routerOptions.routes) {
                    this.add(route.path, route.method, route.behavior);
                }
            }
            if (routerOptions.routeNotFoundHandler !== undefined) {
                this._notFoundHandler = routerOptions.routeNotFoundHandler;
            }
        }
    }

    public add(
        path: string,
        method: HTTPMethod,
        behavior: RouterHandler
    ): void {
        if (this._getByPathAndMethod(path, method) !== undefined) {
            return;
        }
        this._routes.push({
            path,
            method,
            behavior
        });
    }

    public delete(
        path: string,
        method: HTTPMethod
    ): void {
        const indexToRemove = this._routes
            .findIndex(route => route.path === path && route.method === method)
        ;
        if (indexToRemove === -1) {
            return;
        }
        this._routes.splice(indexToRemove, 1);
    }

    public async handle(
        request: HTTPRequest,
        response: HTTPResponse
    ): Promise<HTTPResponse> {
        const path = request.parsed.resource.path;
        const route = this._getByPathAndMethod(
            path.split("?")[0],
            request.parsed.resource.method
        );
        const routeData: RouteData = {
            path,
            params: {},
            queryParams: Path.buildQueryParams(path)
        };
        if (route !== undefined) {
            routeData.params = Path.buildParams(path, route.path);
            return route.behavior(request, response, routeData);
        }
        return this._notFoundHandler(request, response, routeData);
    }

    protected _getByPathAndMethod(
        path: string,
        method: HTTPMethod
    ): Route | undefined {

        return this._routes
            .find(route => Path.matchGenericRoute(path, route.path) && route.method === method)
        ;
    }

    protected _defaultNotFoundHandler(
        request: HTTPRequest,
        response: HTTPResponse
    ): HTTPResponse {
        response.headers.set("Content-Type", {
            type: "text/plain"
        });
        response.status = {
            code: 404,
            name: HTTP_STATUS_NAME[404]
        };
        return response;
    }

}
