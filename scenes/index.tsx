import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { hot } from "react-hot-loader";
import { render } from "react-dom";
import { Container } from "reactstrap";
import JawnList from "./JawnList";
import JawnContext, { JawnState } from "../JawnContext";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://fakerql.com/graphql",
    }),
    cache: new InMemoryCache(),
});

const App: React.SFC<JawnState> = ({ market }) => {
    return (
        <ApolloProvider client={client}>
            <JawnContext.Provider value={{ market }}>
                <Container fluid>
                    <JawnList />
                </Container>
            </JawnContext.Provider>
        </ApolloProvider>
    );
};

const HotApp = hot(module)(App);

render(<HotApp market="UK" />, document.getElementById("root"));
