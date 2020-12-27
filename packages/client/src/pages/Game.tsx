import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useSocketContext } from "../context/SocketContext";

const useGameSocket = (id: string) => {
  const { socket } = useSocketContext();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("JOIN_GAME", id);
  }, []);

  useEffect(() => {
    socket.on("PLAYERS", (list: string[]) => {
      setPlayers(list);
    });
  }, [id]);

  return { players };
};

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const { players } = useGameSocket(id);

  return (
    <div>
      <h1>You have joined game {id}</h1>
      <ul>
        <li>
          <strong>Player Count:&nbsp;</strong>
          {players.length}
        </li>
      </ul>
    </div>
  );
};

export default Game;
