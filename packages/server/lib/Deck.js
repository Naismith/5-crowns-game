import _ from "lodash";

const makeCard = (suit, value) => ({
  suit,
  value,
});

const suits = ["club", "heart", "spade", "star", "diamond"];
const values = [3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

export const makeDeck = () => {
  const deck = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(makeCard(suit, value));
    });
  });

  deck.push(...deck);

  Array(6)
    .fill("")
    .forEach(() => {
      deck.push(makeCard("joker", 50));
    });

  return deck;
};

export class Deck {
  constructor() {
    this.cards = makeDeck();
    this.activeCards = [];
    this.discarded = [];
  }

  // Will shuffle all cards existing in the deck.
  shuffle = () => {
    this.cards = _.shuffle(this.cards);
  };

  reset = () => {
    // Unsure if I should do this, or just call the makeDeck function.
    this.cards = [...this.cards, ...this.activeCards, ...this.discarded];
    this.activeCards = [];
    this.discarded = [];
    this.shuffle();
  };

  // Will remove (n) number of cards from the deck and return them
  draw = (amount = 1) => {
    const drawn = _.take(this.cards, amount);
    this.drawnCards.push(...drawn);
    this.cards = _.drop(this.cards, amount);

    return drawn;
  };
}

// const deck = new Deck();

// const temp = deck.draw();
// console.log(temp);
// console.log(deck.cards);
