import { v4 } from "uuid";

export const makeCard = (suit, value) => ({
  id: v4(),
  suit,
  value,
});
