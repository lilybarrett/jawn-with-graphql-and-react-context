import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { hot } from "react-hot-loader";
import { render } from "react-dom";
import { Container } from "reactstrap";
import JawnList from "./JawnList";
import Cart from "./Cart";
import JawnContext, { JawnState } from "../JawnContext";
import { FindJawnProducts_allProducts } from "../data/models";
import { Row, Col } from "reactstrap";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://fakerql.com/graphql",
    }),
    cache: new InMemoryCache(),
});

class App extends React.Component<JawnState> {
    public state = {
        cart: [],
    };

    public addToCart = (item: FindJawnProducts_allProducts) => {
        const updatedCart = [...this.state.cart, item];
        this.setState({ cart: updatedCart });
    }

    public removeFromCart = (itemIndex: number) => {
        const newCart = this.state.cart;
        newCart.splice!(itemIndex, 1);
        this.setState({ cart: newCart });
    }

    public render () {
        const { market } = this.props;
        return (
            <ApolloProvider client={client}>
                <JawnContext.Provider value={{
                    cart: this.state.cart,
                    addToCart: this.addToCart,
                    removeFromCart: this.removeFromCart,
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
}

const HotApp = hot(module)(App);

render(<HotApp market="US" />, document.getElementById("root"));
