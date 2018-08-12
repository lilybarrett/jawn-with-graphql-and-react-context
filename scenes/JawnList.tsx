import React from "react";
import { JAWN_QUERY } from "../data/queries";
import { graphql, ChildDataProps } from "react-apollo";
import { FindJawnProducts } from "../data/models";

type JawnListType = ChildDataProps<{}, FindJawnProducts>;

const JawnList: React.SFC<JawnListType> = ({ data }) => {
    if (data.loading) {
        return <div>Loading incredibly important and valuable inventory...</div>;
    }
    return (
        <>
            <h1>Welcome to Lily's Jawn</h1>
            <ul>
                {
                    data.allProducts.map((product) => {
                        return (
                            <li key={product.id}>{product.name}</li>
                        );
                    })
                }
            </ul>
        </>
    );
};

const WithJawnProductData = graphql<{}, FindJawnProducts>(JAWN_QUERY);

export default WithJawnProductData(JawnList);
