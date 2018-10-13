import React from "react";
import { JAWN_QUERY } from "../data/queries";
import { graphql, ChildDataProps } from "react-apollo";
import { FindJawnProducts } from "../data/models";
import WithJawnContext from "../WithJawnContext";
import { JawnState } from "../JawnContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import styled from "react-emotion";
import { formatMoney } from "../data/formatters";

type JawnListType = ChildDataProps<{}, FindJawnProducts> & JawnState;

const IconWrapper = styled("span")`
    margin-left: 5px;
`;

const JawnList: React.SFC<JawnListType> = ({ data, market, addToCart }) => {
    if (data.loading) {
        return <div>Loading incredibly important and valuable inventory...</div>;
    }
    return (
        <>
            <h1>Welcome to Lily's Jawn</h1>
            <ul>
                {
                    data.allProducts.map((product) => {
                        const { id, price, name } = product;
                        const formattedPrice = formatMoney(market, price);
                        return (
                            <li key={id}>
                                {name} - {formattedPrice}
                                <IconWrapper onClick={() => addToCart(product)}>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                    />
                                </IconWrapper>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

const WithJawnProductData = graphql<{}, FindJawnProducts>(JAWN_QUERY);

export default WithJawnProductData(WithJawnContext(JawnList));
