import { gql } from "@apollo/client";

export const GET_USER_CVS_QUERY = gql`
    query UserCvs($userId: ID!) {
        user(userId: $userId) {
            id
            cvs {
                id
                created_at
                name
                description
            }
        }
    }
`;
