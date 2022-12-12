# Falcon

**Falcon** is a lightweight HTTP client and server framework for Node.js.

## Install

Make sure you have `npm` or `yarn` installed.

Then run in your favorite Terminal :

`npm install @lucyus/falcon`

OR

`yarn install @lucyus/falcon`

## Features

* HTTP
* HTTPS
* WebSocket
* WebSocket Secure

## Usage

### HTTP Server

```js
const { Server, HTTP_STATUS_NAME } = require('@lucyus/falcon');
const httpServer = new Server({
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
    /* ... see ServerOptions for more ... */
});
httpServer.start()
    .then(() => {
        console.log("Server started at: http://localhost:8000");
    });
```

### HTTPS Server

Assuming you have valid `server.key` and `server.crt` in current directory:
```js
const { Server, HTTP_STATUS_NAME } = require('@lucyus/falcon');
const httpsServer = new Server({
    port: 8000,
    openSsl: {
        paths: {
            serverKey: "server.key",
            serverCertificate: "server.crt"
        }
    },
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
    /* ... see ServerOptions for more ... */
});
httpsServer.start()
    .then(() => {
        console.log("Server started at: https://localhost:8000");
    });
```

### WebSocket

```js
const { Server, HTTP_STATUS_NAME } = require('@lucyus/falcon');
const httpServer = new Server({
    port: 8000,
    router: {
        routes: [
            {
                path: "/",
                method: "GET",
                behavior: (request, response, routeData) => {
                    response.headers.set("Content-Type", {
                        type: "text/html"
                    });
                    response.status = {
                        code: 200,
                        name: HTTP_STATUS_NAME[200]
                    };
                    response.body.content = `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>HTTP with WebSocket</title>
                        </head>
                        <body>
                            <h1>HTTP with WebSocket</h1>
                            <p>You can inspect your browser's "Network" tab to read WebSocket messages!</p>
                            <script>
                                const socket = new WebSocket("ws://localhost:8000/");
                                socket.addEventListener("open", (event) => {
                                    console.log("WebSocket connection established!");
                                    socket.send("Hello, server!");
                                });
                                socket.addEventListener("message", (event) => {
                                    console.log("WebSocket message received:", event.data);
                                });
                                socket.addEventListener("close", (event) => {
                                    console.log("WebSocket connection closed!");
                                });
                                socket.addEventListener("error", (event) => {
                                    console.log("WebSocket error:", event);
                                });
                            </script>
                        </body>
                    </html>
                    `;
                    return response;
                }
            }
        ]
    },
    webSocketRouter: {
        routes: [
            {
                path: "/",
                shouldHandshake: (request, response, routeData) => {
                    return {
                        acceptContext: "You can pass any contextual data in any type about the client to the handlers here!"
                    };
                },
                handlers: {
                    onJoin: (webSocketManager, clientData) => {
                        return `Hello, ${clientData.client.remoteAddress}:${clientData.client.remotePort}!`;
                    },
                    onMessage: (message, webSocketManager, clientData) => {
                        return `Got it, ${clientData.client.remoteAddress}:${clientData.client.remotePort}!`;
                    },
                    onError: (error, webSocketManager, clientData) => {
                        return `Something went wrong, ${clientData.client.remoteAddress}:${clientData.client.remotePort}!`;
                    },
                    onLeave: (webSocketManager, clientData) => {
                        console.log(`Goodbye, ${clientData.client.remoteAddress}:${clientData.client.remotePort}!`);
                    }
                }
            }
        ]
    }
    /* ... see ServerOptions for more ... */
});
httpServer.start()
    .then(() => {
        console.log("Server started at: http://localhost:8000");
    });
```

> Note: You can also use WebSockets with HTTPS servers.

## License

This project is made under the [Apache 2.0](./LICENSE) license.
