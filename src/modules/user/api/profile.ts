import { gql, useQuery } from "@apollo/client";
import { User } from "cv-graphql";

const PROFILE = gql`
    query Profile($userId: ID!) {
        user(userId: $userId) {
            id
            email
            is_verified
            profile {
                id
                created_at
                first_name
                last_name
                full_name
                avatar
            }
            position_name
            department_name
        }
    }
`;

interface ProfileArgs {
    userId: string;
}

interface ProfileResult {
    user: User;
}

export const useProfile = ({ userId }: ProfileArgs) => {
    return useQuery<ProfileResult, ProfileArgs>(PROFILE, {
        variables: {
            userId,
        },
        onError(error) {
            console.error(error.message);
        },
        onCompleted(data) {
            console.log(data);
        },
    });
};
