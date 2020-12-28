import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import { DeckCard } from "../common/types";
import { Card } from "../components/Card";

const useGameSocket = (id: string) => {
  const { socket } = useSocketContext();
  const [hand, setHand] = useState<DeckCard[]>([]);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("JOIN_GAME", id);
  }, []);

  useEffect(() => {
    socket.on("PLAYERS", (list: string[]) => {
      setPlayers(list);
    });

    socket.on("CARDS", (cards: DeckCard[]) => {
      setHand(cards);
    });
  }, [id]);

  const startGame = () => {
    socket.emit("START_GAME", id);
  };

  return { players, startGame, hand };
};

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<null | number>(null);
  const { players, startGame, hand } = useGameSocket(id);

  return (
    <div>
      <h1>You have joined game {id}</h1>
      <ul>
        <li>
          <strong>Player Count:&nbsp;</strong>
          {players.length}
        </li>
      </ul>

      <button onClick={startGame}>Start Game</button>

      {hand.map(({ suit, value }, i) => (
        <Card
          key={i}
          suit={suit}
          value={value}
          selected={selected === i}
          onClick={() => setSelected(i)}
        />
      ))}
    </div>
  );
};

export default Game;
