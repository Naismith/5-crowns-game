import React, { useEffect, useState } from "react";
import { Game } from "../common/types";
import { useSocketContext } from "../context/SocketContext";
import { useHistory } from "react-router-dom";

export const useGameLogic = () => {
  const history = useHistory();
  const [games, setGames] = useState<Game[]>([]);
  const { socket } = useSocketContext();

  useEffect(() => {
    const handler = (message: { games: Game[] }) => {
      const { games } = message;
      setGames(games);
    };

    const callback = (whatever: any) => {
      console.log(whatever);
    };

    socket.on("game-list", handler);

    return () => {
      socket.off("game-list", handler);
    };
  }, []);

  const createGame = () => {
    socket.emit("create-game", (response: Game) => {
      history.push(`/game/${response.id}`);
    });
  };

  return {
    games,
    createGame,
  } as const;
};
