import React from "react";
import styled from "styled-components";
import { CardSuit, CardValue } from "../common/types";

const Wrapper = styled.article<{ selected: boolean }>`
  height: 7em;
  width: 3.5em;
  margin-right: 0.5em;

  font-size: 3rem;
  border-radius: 0.25em;
  display: inline-block;
  padding: 1rem;
  border: 2px solid ${(props) => (props.selected ? "red" : "black")};
`;

interface Props {
  suit: CardSuit;
  value: CardValue;
  onClick: () => void;
  selected: boolean;
}

const getCardIcon = (suit: CardSuit) => {
  switch (suit) {
    case "club":
      return "♣️";
    case "diamond":
      return "♦️";
    case "heart":
      return "♥️";
    case "joker":
      return null;
    case "spade":
      return "♠️";
    case "star":
      return "⭐";
  }
};

export const Card = ({ suit, value, onClick, selected }: Props) => {
  const icon = getCardIcon(suit);

  return (
    <Wrapper onClick={onClick} selected={selected}>
      {suit === "joker" ? "JOKER" : `${value} ${icon}`}
    </Wrapper>
  );
};
