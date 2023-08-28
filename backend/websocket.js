
import WebSocketServer from "ws/lib/websocket-server";

export let wss

let numberOfClients = 0;

export const startWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });
  wss.on(
    "connection",
    (ws) => {
      numberOfClients++;
      console.log(
        `A new client has joined, ${numberOfClients} client(s) connected`
      );
      ws.on("close", () => {
        numberOfClients--;
        console.log(
          `A client has been disconnected, ${numberOfClients} client(s) connected`
        );
      });

      ws.send("Welcome");
    }
  );
};
