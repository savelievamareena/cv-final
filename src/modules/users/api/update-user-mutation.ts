import { gql, useMutation } from "@apollo/client";
import { UpdateUserInput } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";
import { GET_USER_QUERY } from "./get-user-query";
import { GET_USERS_QUERY } from "./get-users-query";
import { UpdateUserResult } from "./users.types";

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
