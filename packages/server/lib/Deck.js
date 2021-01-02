import _ from "lodash";
import { makeCard } from "./Card.js";

const defaultSuits = ["club", "heart", "spade", "diamond"];
const defaultValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

export class Deck {
  constructor(suits = defaultSuits, values = defaultValues) {
    this.suits = suits;
    this.values = values;

    this.cards = [];
    this.activeCards = [];
    this.discarded = [];

    this.generate();
  }

  // Will shuffle all cards existing in the deck.
  shuffle = () => {
    this.cards = _.shuffle(this.cards);
  };

  generate = () => {
    const cards = [];

    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        cards.push(makeCard(suit, value));
      });
    });

    this.cards = cards;
  };

  reset = () => {
    this.generate();
  };

  // Will remove (n) number of cards from the deck and return them
  draw = (amount = 1) => {
    const drawn = _.take(this.cards, amount);
    this.cards = _.drop(this.cards, amount);

    return drawn;
  };
}
