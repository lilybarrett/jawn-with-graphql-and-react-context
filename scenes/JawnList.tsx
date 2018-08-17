import React from "react";
import { JAWN_QUERY } from "../data/queries";
import { graphql, ChildDataProps } from "react-apollo";
import { FindJawnProducts } from "../data/models";
import WithJawnContext from "../WithJawnContext";
import { JawnState } from "../JawnContext";

type JawnListType = ChildDataProps<{}, FindJawnProducts> & JawnState;

const JawnList: React.SFC<JawnListType> = ({ data, market }) => {
    if (data.loading) {
        return <div>Loading incredibly important and valuable inventory...</div>;
    }
    return (
        <>
            <h1>Welcome to Lily's Jawn</h1>
            <ul>
                {
                    data.allProducts.map((product) => {
                        const price = market === "US"
                            ? product.price
                            : (parseInt(product.price, 10) * 0.79).toFixed(2);
                        const currencySymbol = market === "US" ? "$" : "£";
                        return (
                            <li key={product.id}>
                                {product.name} - {currencySymbol}{price}
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
