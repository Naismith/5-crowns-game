import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGameLogic } from "../hooks/useGameLogic";

const Lobby = () => {
  const { games, createGame } = useGameLogic();

  return (
    <div>
      <h1>Welcome to 5 crowns</h1>

      <h3>Game List</h3>
      <Button onClick={createGame} variant="contained" color="primary">
        Create Game
      </Button>
      {games.map((game) => (
        <div key={game.id}>
          <h4>Game {game.id}</h4>
          <Link to={`/game/${game.id}`}>join</Link>
        </div>
      ))}
    </div>
  );
};

export default Lobby;
