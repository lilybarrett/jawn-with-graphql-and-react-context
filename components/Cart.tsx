import React, { Component } from "react";
import { JawnState } from "../JawnContext";
import WithJawnContext from "../WithJawnContext";
import { formatMoney } from "../data/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/fontawesome-free-solid";
import styled from "react-emotion";

const IconWrapper = styled("span")`
    margin-left: 5px;
`;

const Cart: React.FunctionComponent<JawnState> = ({ market, cart, removeFromCart }) => {
    const total = cart.reduce((sum, item) => {
        sum + parseInt(item.price, 10);
    }, 0);
    return (
        <>
                <h1>Your cart</h1>
                <ul>
                    { cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - {formatMoney(market, item.price)}
                            <IconWrapper onClick={() => removeFromCart(index)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </IconWrapper>
                        </li>
                    ))}
                </ul>
                <h3>
                    Total: ${total}
                </h3>
            </>
    );
};

export default WithJawnContext(Cart);
