import { Deck } from "./Deck.js";

const suits = ["club", "heart", "spade", "star", "diamond"];
const values = [3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

export class FiveCrownsDeck extends Deck {
  constructor() {
    super(suits, values);

    this.shuffle();
  }

  generate = () => {
    const cards = [];

    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        const cards = _.times(2, () => makeCard(suit, value));
        cards.push(...cards);
      });
    });

    _.times(6, () => cards.push(makeCard("joker", 50)));

    this.cards = cards;
  };
}
