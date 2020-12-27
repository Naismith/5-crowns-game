import React from 'react';
import styled from 'styled-components';
import { CardType, CardValue } from '../common/types';

const Wrapper = styled.article`
    height: 7em;
    width: 3.5em;

    font-size: 3rem;
    border-radius: 0.25em;
    display: inline-block;
    padding: 1rem;
    border: 1px solid black;
`

interface Props {
    type: CardType
    value: CardValue
};


const getCardIcon = (type: CardType) => {
    switch (type) {
        case "club":
            return "♣️";
        case "diamond":
            return "♦️";
        case "heart":
            return "♥️";
        case "joker":
            return null;
        case "spade":
            return "♠️"
        case "star":
            return "⭐";
    }
}

export const Card = ({ type, value }: Props) => {
    const icon = getCardIcon(type);

    if (type === "joker") {
        return <Wrapper>
            JOKER
        </Wrapper>
    }

    return (
        <Wrapper>
            {value} {icon}
        </Wrapper>
    )
};
