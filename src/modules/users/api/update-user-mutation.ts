import { gql, useMutation } from "@apollo/client";
import { UpdateUserInput } from "cv-graphql";
import { UpdateUserResult } from "./users.types";
import { GET_USERS_QUERY } from "./get-users-query";
import { GET_USER_QUERY } from "./get-user-query";
import { useNotificationContext } from "@/helpers/notification";

const UPDATE_USER = gql`
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
    const { showNotification } = useNotificationContext();

    return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER, {
        refetchQueries: [GET_USERS_QUERY, GET_USER_QUERY],
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
