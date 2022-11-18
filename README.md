# Falcon

**Falcon** is a lightweight HTTP client and server framework.

## Install

Make sure you have `npm` or `yarn` installed.

Then run in your favorite Terminal :

`npm install @lucyus/falcon`

OR

`yarn install @lucyus/falcon`

## Usage

### Javascript

In `your-file.js`, write :
```js
const { Server, HTTP_STATUS_NAME } = require('@lucyus/falcon');
const server = new Server({
    port: 8000,
    router: {
        routes: [
            {
                path: "/",
                method: "GET",
                behavior: (request, response, routeData) => {
                    response.headers.set("Content-Type", {
                        type: "text/plain"
                    });
                    response.status = {
                        code: 200,
                        name: HTTP_STATUS_NAME[200]
                    };
                    response.body.content = "Server is running!";
                    return response;
                }
            }
        ]
    }
});
server.start();
```

### Typescript
In `your-file.ts`, write :
```ts
import { Server, HTTP_STATUS_NAME } from '@lucyus/falcon';
const server: Server = new Server({
    port: 8000,
    router: {
        routes: [
            {
                path: "/",
                method: "GET",
                behavior: (request, response, routeData) => {
                    response.headers.set("Content-Type", {
                        type: "text/plain"
                    });
                    response.status = {
                        code: 200,
                        name: HTTP_STATUS_NAME[200]
                    };
                    response.body.content = "Server is running!";
                    return response;
                }
            }
        ]
    }
});
```

## License

This project is made under the [Apache 2.0](./LICENSE) license.
