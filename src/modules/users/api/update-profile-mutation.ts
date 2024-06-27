import { gql, useMutation } from "@apollo/client";
import { Profile, UpdateProfileInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { GET_PROFILE_QUERY } from "./get-profile-query";
import { useNotificationContext } from "@/helpers/notification";
import { RouteParams } from "@/router";

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profile: UpdateProfileInput!) {
        updateProfile(profile: $profile) {
            id
        }
    }
`;

interface ProfileResult {
    profile: Profile;
}

export const useProfileUpdate = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { showNotification } = useNotificationContext();

    return useMutation<ProfileResult, { profile: UpdateProfileInput }>(UPDATE_PROFILE, {
        refetchQueries: [{ query: GET_PROFILE_QUERY, variables: { userId } }],
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
