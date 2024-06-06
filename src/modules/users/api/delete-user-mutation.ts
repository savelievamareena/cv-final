import { gql, useMutation } from "@apollo/client";
import { GET_USERS_QUERY } from "./get-users-query";

export const DELETE_USER = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(userId: $userId) {
            affected
        }
    }
`;

export const useUserDelete = (userId: string) => {
    return useMutation(DELETE_USER, {
        variables: {
            userId,
        },
        refetchQueries: [GET_USERS_QUERY],
    });
};
