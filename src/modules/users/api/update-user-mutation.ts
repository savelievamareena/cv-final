import { gql, useMutation } from "@apollo/client";
import { UpdateUserInput } from "cv-graphql";
import { UpdateUserResult } from "./users.types";
import { USERS_QUERY } from "./get-users-query";

export const UPDATE_USER = gql`
    mutation UpdateUser($user: UpdateUserInput!) {
        updateUser(user: $user) {
            id
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

export const useUserUpdate = () => {
    return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER, {
        refetchQueries: [USERS_QUERY],
    });
};
