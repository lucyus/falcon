import {
    WebSocketErrorHandler,
    WebSocketJoinHandler,
    WebSocketLeaveHandler,
    WebSocketMessageHandler
} from ".";

export type WebSocketHandlers = {
    onJoin?: WebSocketJoinHandler;
    onMessage?: WebSocketMessageHandler;
    onError?: WebSocketErrorHandler;
    onLeave?: WebSocketLeaveHandler;
};
