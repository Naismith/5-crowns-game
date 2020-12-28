import { Server } from "socket.io";
import { v4 } from "uuid";
import { makeDeck } from "./lib/Deck.js";
import _ from "lodash";

const games = [];

const makeGame = () => {
  return {
    id: v4(),
    players: [],
    deck: makeDeck(),
  };
};

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Refresh game list every 7.5 seconds
  setInterval(() => {
    io.sockets.emit("game-list", { games });
  }, 7500);

  io.on("connection", (socket) => {
    socket.emit("game-list", { games }); // Emit game list on initial connection

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

    socket.on("START_GAME", (id) => {
      const playerList = [...io.sockets.adapter.rooms.get(id)];
      const game = games.find((game) => game.id === id);
      const hands = _.chunk(_.take(game.deck, playerList.length * 3), 3);

      playerList.forEach((id, index) => {
        io.to(id).emit("CARDS", hands[index]);
      });

      console.log(hands);
    });
  });

  return io;
};

export default socket;
