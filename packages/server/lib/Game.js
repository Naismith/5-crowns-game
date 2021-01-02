import { v4 } from "uuid";
import _ from "lodash";
import { FiveCrownsDeck } from "./FiveCrownsDeck.js";
import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

export class Game {
  constructor(name = v4()) {
    this.id = name;
    this.players = [];
    this.startingPlayerId = null; // Keep track for the next player to start round
    this.currentPlayerId = null;
    this.deck = new FiveCrownsDeck();
    this.state = "waiting"; // "waiting" | "started" | "finished"
    this.currentTurn = null;
    this.currentRound = 3; // Number of cards delt/the current wild card
    this.maxRounds = 13;

    this.discardPile = [];
  }

  startGame = () => {
    this.state = "started";
    const playerIndex = _.random(0, this.players.length - 1);
    this.currentPlayerId = this.startingPlayerId = this.players[playerIndex].id;

    this.players.forEach((player) => {
      player.hand = this.deck.draw(this.currentRound);
    });
  };

  getStatus = (playerId) => {
    return {
      currentRound: this.currentRound,
      state: this.state,
      currentTurn: this.currentPlayerId === playerId,
    };
  };

  nextRound = () => {
    this.currentRound += 1;

    // Handle max round logic

    // Handle discard pile and putting back into the deck

    // handling scoring logic
  };

  currentPlayer = () =>
    this.players.find((player) => player.id === this.currentPlayerId);

  discardForPlayer = (cardId) => {
    // Check if they can discard
    if (this.currentPlayer().cardCount() <= this.currentRound) return;

    const card = this.currentPlayer().removeCard(cardId); // Get card to add to discarded pile

    this.discardPile.push(card);

    const currentIndex = this.players.findIndex(
      (p) => p === this.currentPlayer()
    );
    const nextIndex = (currentIndex + 1) % this.players.length;
    this.currentPlayerId = this.players[nextIndex].id;
  };

  drawForPlayer = () => {
    const currentPlayer = this.currentPlayer();
    const pickupCount = this.currentRound + 1 - currentPlayer.cardCount();
    const cards = this.deck.draw(pickupCount);
    currentPlayer.addCards(...cards);

    return cards;
  };

  addPlayer = (socketId) => {
    this.players.push(new Player(socketId));
  };

  removePlayer = (socketId) => {
    this.players = this.players.filter(
      (player) => player.socketId !== socketId
    );
  };
}
