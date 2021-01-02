import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import { DeckCard, GameStatus } from "../common/types";
import { Card } from "../components/Card";

const useGameSocket = (id: string) => {
  const { socket } = useSocketContext();
  const [isCurrentTurn, setIsCurrentTurn] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
  const [selected, setSelected] = useState<null | number>(null);
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

    socket.on("GAME_STATUS", (gameStatus: GameStatus) => {
      console.log(gameStatus);
      setGameStatus(gameStatus);
    });
  }, [id]);

  const drawFromDeck = () => {
    socket.emit("DRAW_FROM_DECK", id, (card: DeckCard[]) => {
      setHand((prev) => [...prev, ...card]);
    });
  };

  const startGame = () => {
    socket.emit("START_GAME", id);
  };

  const discardFromHand = () => {
    if (!gameStatus || !selected) return;

    if (hand.length > gameStatus?.currentRound) {
      socket.emit("DISCARD_CARD", id, hand[selected].id);
      setHand((prev) => prev.filter((card, index) => index !== selected));
      setSelected(null);
    }
  };

  return {
    isCurrentTurn,
    gameStatus,
    players,
    startGame,
    hand,
    drawFromDeck,
    discardFromHand,
    selected,
    setSelected,
  };
};

const Game = () => {
  const { id } = useParams<{ id: string }>();

  const {
    gameStatus,
    players,
    startGame,
    hand,
    drawFromDeck,
    discardFromHand,
    selected,
    setSelected,
  } = useGameSocket(id);

  return (
    <div>
      <h1>You have joined game {id}</h1>
      <ul>
        <li>
          <strong>Player Count:&nbsp;</strong>
          {players.length}
        </li>
      </ul>

      {gameStatus !== null && (
        <>
          {gameStatus.state !== "started" && (
            <button onClick={startGame}>Start Game</button>
          )}

          {gameStatus.currentTurn && (
            <>
              <button onClick={drawFromDeck}>Draw from deck</button>
              <button onClick={discardFromHand}>Remove from hand</button>
            </>
          )}
        </>
      )}

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
