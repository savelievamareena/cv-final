import { gql, useMutation } from "@apollo/client";
import { GET_USERS_QUERY } from "./get-users-query";
import { CreateUserResult } from "./users.types";

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
        refetchQueries: [GET_USERS_QUERY],
    });
};
