import { gql } from "@apollo/client";

export const USER_CVS_QUERY = gql`
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
