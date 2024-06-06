import { gql, useMutation } from "@apollo/client";
import { CreateUserResult } from "./users.types";
import { USERS_QUERY } from "./get-users-query";

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(user: $user) {
            id
            profile {
                id
                first_name
                last_name
                full_name
            }
            department {
                id
                name
            }
            position {
                id
                name
            }
        }
    }
`;

export const useUserCreate = () => {
    return useMutation<CreateUserResult>(CREATE_USER, {
        refetchQueries: [USERS_QUERY],
    });
};
