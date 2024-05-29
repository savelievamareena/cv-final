import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SingUp($authData: AuthInput!) {
        signup(auth: $authData) {
            user {
                id
                email
                is_verified
            }
            access_token
        }
    }
`;
