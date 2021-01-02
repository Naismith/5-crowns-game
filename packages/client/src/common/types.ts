export type CardSuit =
  | "heart"
  | "diamond"
  | "spade"
  | "club"
  | "star"
  | "joker";
export type CardValue =
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | "J"
  | "Q"
  | "K"
  | "Joker";

export interface Game {
  id: string;
}

export interface DeckCard {
  id: string;
  suit: CardSuit;
  value: CardValue;
}

type GameState = "waiting" | "started" | "finished";

export interface GameStatus {
  state: GameState;
  currentTurn: boolean;
  currentRound: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}
