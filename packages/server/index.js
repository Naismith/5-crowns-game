import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { v4 } from "uuid";

const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const games = [];

const makeGame = () => {
  return {
    id: v4(),
    players: [],
    deck: [],
  };
};

const gameNamespace = io.of("/game");

gameNamespace.on("connection", (socket) => {
  // console.log("game handler", socket);
});

setInterval(() => {
  io.sockets.emit("game-list", { games });
}, 5000);

io.on("connection", (socket) => {
  socket.emit("init", { games });

  socket.on("create-game", (cb) => {
    console.log("creating game");
    const newGame = makeGame();
    games.push(newGame);
    socket.join(newGame.id);
    cb(newGame);
  });

  socket.on("JOIN_GAME", (id, cb) => {
    socket.join(id);
    io.to(id).emit("PLAYERS", [...io.sockets.adapter.rooms.get(id)]);
  });
});

server.listen(4000);
server.on("listening", () => {
  console.log("Listening on http://localhost:4000");
});
