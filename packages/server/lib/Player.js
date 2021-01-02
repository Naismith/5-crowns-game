import { v4 } from "uuid";

export class Player {
  constructor(socketId) {
    this.socketId = socketId;
    this.id = v4();

    this.hand = [];
  }

  cardCount = () => this.hand.length;

  addCards = (...cards) => {
    this.hand = [...this.hand, ...cards];
  };

  removeCard = (id) => {
    const card = this.hand.find((card) => card.id === id);
    this.hand = this.hand.filter((c) => c !== card);

    return card;
  };
}
