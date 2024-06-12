import { gql, useQuery } from "@apollo/client";
import { User } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const GET_USER_QUERY = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            id
            email
            is_verified
            position {
                id
                name
            }
            department {
                id
                name
            }
        }
    }
`;

interface QueryArgs {
    userId?: string;
}

interface UserResult {
    user: User;
}

export const useUserQuery = ({ userId }: QueryArgs) => {
    const { showNotification } = useNotificationContext();

    return useQuery<UserResult, QueryArgs>(GET_USER_QUERY, {
        variables: {
            userId,
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
