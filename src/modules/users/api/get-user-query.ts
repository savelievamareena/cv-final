import { useNotificationContext } from "@/helpers/notification";
import { gql, useQuery } from "@apollo/client";
import { User } from "cv-graphql";

export const USER = gql`
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
    userId: string;
}

interface UserResult {
    user: User;
}

export const useUser = ({ userId }: QueryArgs) => {
    const { showNotification } = useNotificationContext();

    return useQuery<UserResult, QueryArgs>(USER, {
        variables: {
            userId,
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
