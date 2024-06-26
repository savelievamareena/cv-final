/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { authService } from "@/services/auth-service";

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

const authLink = setContext((_, { headers }) => {
    const authToken = authService.accessToken();

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
                authService.logout();
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
