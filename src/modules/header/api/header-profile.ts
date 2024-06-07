import { gql, useQuery } from "@apollo/client";
import { Profile } from "cv-graphql";

export const HEADER_PROFILE = gql`
    query Profile($userId: ID!) {
        profile(userId: $userId) {
            id
            full_name
            avatar
        }
    }
`;

interface QueryArgs {
    userId: string;
}

interface ProfileResult {
    profile: Profile;
}

export const useHeaderProfile = ({ userId }: QueryArgs) => {
    return useQuery<ProfileResult, QueryArgs>(HEADER_PROFILE, {
        variables: {
            userId,
        },
        onError: (error) => {
            console.error(error.message);
        },
    });
};
