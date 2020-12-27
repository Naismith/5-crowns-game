import React, { useState, useRef } from "react";
import { Card } from "../components/Card";
import { CardType, CardValue } from "../common/types";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGameLogic } from "../hooks/useGameLogic";

const types = ["club", "heart", "spade", "star", "diamond"] as CardType[];
const values = [3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"] as CardValue[];

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
