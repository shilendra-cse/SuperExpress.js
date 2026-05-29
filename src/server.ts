import type { Handler, Route } from "./types.js";
import net from "node:net";

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

  //listen function spins up a server on given prompt
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

        const res = {
          send(body: string) {
            socket.write("HTTP/1.1 200 OK\r\n");
            socket.write("Content-Type: text/html\r\n");
            socket.write("\r\n");
            socket.write(body);
            socket.end();
          },
        };
        if (matchedRoute) matchedRoute.handler(res);
      });
    });

    server.listen(port);
  }

  return { get, post, patch, listen };
}
