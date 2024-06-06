import { gql, useQuery } from "@apollo/client";
import { UsersResult } from "./users.types";

export const GET_USERS_QUERY = gql`
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

export const useUsersQuery = () => {
    const query = useQuery<UsersResult>(GET_USERS_QUERY);
    return { users: query.data?.users ?? [], ...query };
};
