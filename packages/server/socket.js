import { Server } from "socket.io";
import { Game } from "./lib/Game.js";
import _ from "lodash";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const games = [new Game("demo")];

  // Refresh game list every 7.5 seconds
  setInterval(() => {
    io.sockets.emit("game-list", { games });
  }, 7500);

  io.on("connection", (socket) => {
    socket.emit("game-list", { games }); // Emit game list on initial connection

    socket.on("create-game", (cb) => {
      const newGame = new Game();
      newGame.addPlayer(socket.id);

      games.push(newGame);
      cb(newGame);
    });

    socket.on("JOIN_GAME", (id, cb) => {
      socket.join(id);

      const game = games.find((game) => game.id === id);
      game.addPlayer(socket.id);

      game.players.forEach((player) => {
        io.to(player.socketId).emit("GAME_STATUS", game.getStatus(player.id));
      });
      io.to(id).emit("PLAYERS", Array.from(io.sockets.adapter.rooms.get(id)));
    });

    socket.on("DRAW_FROM_DECK", (id, cb) => {
      const game = games.find((game) => game.id === id);
      const card = game.drawForPlayer();
      cb(card);
    });

    socket.on("DISCARD_CARD", (id, cardId) => {
      console.log(id, cardId);
      const game = games.find((game) => game.id === id);
      game.discardForPlayer(cardId);

      game.players.forEach((player) => {
        io.to(player.socketId).emit("GAME_STATUS", game.getStatus(player.id));
      });
    });

    socket.on("START_GAME", (id) => {
      const game = games.find((game) => game.id === id);

      game.startGame();

      game.players.forEach((player) => {
        io.to(player.socketId).emit("GAME_STATUS", game.getStatus(player.id));
        io.to(player.socketId).emit("CARDS", player.hand);
      });
    });
  });

  return io;
};

export default socket;
