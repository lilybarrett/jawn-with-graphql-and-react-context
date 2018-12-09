import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { hot } from "react-hot-loader";
import { render } from "react-dom";
import { Container } from "reactstrap";
import { JawnList } from "./components";
import { Cart } from "./components";
import JawnContext, { JawnState } from "./JawnContext";
import { FindJawnProducts_allProducts } from "./data/models";
import { Row, Col } from "reactstrap";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://fakerql.com/graphql",
    }),
    cache: new InMemoryCache(),
});

const App: React.FunctionComponent<JawnState> = (props) => {
    const [cart, setCart] = useState<any[]>([]);
    // change this any type!

    const addToCart = (item: FindJawnProducts_allProducts) => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        console.log(cart);
        // the state never gets updated
    }
    
    const removeFromCart = (itemIndex: number) => {
        const updatedCart = cart;
        updatedCart.splice!(itemIndex, 1);
        setCart(updatedCart);
    }    

    const { market } = props;
    return (
        <ApolloProvider client={client}>
            <JawnContext.Provider value={{
                cart,
                addToCart,
                removeFromCart,
                market,
            }}>
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={6}>
                            <JawnList />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Cart />
                        </Col>
                    </Row>
                </Container>
            </JawnContext.Provider>
        </ApolloProvider>
    );
}

const HotApp = hot(module)(App);

render(<HotApp market="US" />, document.getElementById("root"));
