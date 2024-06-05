import { gql } from "@apollo/client";

export const USERS = gql`
    query Users {
        users {
            id
            email
            profile {
                id
                first_name
                last_name
                full_name
                avatar
            }
            department {
                id
                name
            }
            position {
                id
                name
            }
            role
        }
    }
`;

export const USER_CVS = gql`
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
