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
            if (message.includes("duplicate key value")) {
            } else if (message === "Unauthorized") {
                authService.logout();
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
