export type CardType = "heart" | "diamond" | "spade" | "club" | "star" | "joker"
export type CardValue = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "Joker"


export interface Game {
    id: string;
}