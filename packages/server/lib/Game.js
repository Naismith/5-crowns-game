import { v4 } from "uuid";

class Game {
  constructor() {
    this.id = v4();
    this.players = [];
    this.deck = [];

    return this;
  }

  addPlayer(newPlayer) {
    this.players.push(newPlayer);

    return this;
  }
}
