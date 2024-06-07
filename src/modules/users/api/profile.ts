import { HEADER_PROFILE } from "@/modules/header/api";
import { RouteParams } from "@/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Profile, UpdateProfileInput } from "cv-graphql";
import { useParams } from "react-router-dom";

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
        onError: (error) => {
            console.error(error.message);
        },
    });
};

export const useUpdateProfile = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    return useMutation<ProfileResult, { profile: UpdateProfileInput }>(UPDATE_PROFILE, {
        refetchQueries: [PROFILE, { query: HEADER_PROFILE, variables: { userId } }],
        onError: (error) => {
            console.error(error.message);
        },
    });
};
