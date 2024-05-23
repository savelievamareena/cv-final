/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { AUTH_TOKEN } from "src/constants";
import.meta.env.GRAPHQL_API_URLGRAPHQL_API_URL;

const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : "",
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
            console.error(message);
            // TODO: Add some toasts or messages on error
            if (message.includes("duplicate key value")) {
                // some toast or message
            } else if (message === "Unauthorized") {
                // some toast or message
                // TODO: Add proper logging out functionality
            } else {
                // some toast or message
            }
        });
    }
    if (networkError) {
        console.error(networkError);
    }
});

export const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
});
