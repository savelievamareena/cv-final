import { gql, useMutation, useQuery } from "@apollo/client";
import { User, UpdateUserInput } from "cv-graphql";

const USER = gql`
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

const UPDATE_USER = gql`
    mutation UpdateUser($user: UpdateUserInput!) {
        updateUser(user: $user) {
            id
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
    return useQuery<UserResult, QueryArgs>(USER, {
        variables: {
            userId,
        },
        onError: (error) => {
            console.error(error.message);
        },
    });
};

export const useUpdateUser = () => {
    return useMutation<UserResult, { user: UpdateUserInput }>(UPDATE_USER, {
        refetchQueries: [USER],
        onError: (error) => {
            console.error(error.message);
        },
    });
};
