import app from "./app.js";
import http from "http";
import socket from "./socket.js";

const server = http.createServer(app.callback());
const io = socket(server);

server.listen(4000);
server.on("listening", () => {
  console.log("Listening on http://localhost:4000");
});
