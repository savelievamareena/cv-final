import { gql } from "@apollo/client";

export const LOGIN = gql`
    query Login($authData: AuthInput!) {
        login(auth: $authData) {
            user {
                id
                email
                is_verified
            }
            access_token
        }
    }
`;
