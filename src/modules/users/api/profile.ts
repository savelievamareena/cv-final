import { gql, useMutation, useQuery } from "@apollo/client";
import { Profile, UpdateProfileInput } from "cv-graphql";

export const PROFILE = gql`
    query Profile($userId: ID!) {
        profile(userId: $userId) {
            id
            created_at
            first_name
            last_name
            full_name
            avatar
        }
    }
`;

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profile: UpdateProfileInput!) {
        updateProfile(profile: $profile) {
            id
        }
    }
`;

interface QueryArgs {
    userId: string;
}

interface ProfileResult {
    profile: Profile;
}

export const useProfile = ({ userId }: QueryArgs) => {
    return useQuery<ProfileResult, QueryArgs>(PROFILE, {
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

export const useUpdateProfile = () => {
    return useMutation<ProfileResult, { profile: UpdateProfileInput }>(UPDATE_PROFILE, {
        refetchQueries: [PROFILE],
        onError(error) {
            console.error(error.message);
        },
        onCompleted(data) {
            console.log(data);
        },
    });
};
