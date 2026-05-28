import type { Handler, Route } from "./types.js";
import net, { Socket } from "node:net";

export function createApp() {
  //Space for registering the routes
  const routes: Route[] = [];

  //for creating GET API
  function get(path: string, handler: Handler) {
    routes.push({
      method: "GET",
      path,
      handler,
    });
  }

  //for creating POST API
  function post() {}
  //for creating PATCH API
  function patch() {}

  function listen(port: number) {
    const server = net.createServer((socket) => {
      socket.setEncoding("utf8");

      socket.on("data", (data) => {
        const rawRequest = data.toString();

        const [firstLine] = rawRequest.split("\r\n");
        if (!firstLine) return;

        const [method, path, version] = firstLine.split(" ");

        const matchedRoute = routes.find((route) => {
          return route.method === method && route.path === path;
        });

        if (matchedRoute) matchedRoute.handler();
      });
    });

    server.listen(port);
  }

  return { get, post, patch, listen };
}
