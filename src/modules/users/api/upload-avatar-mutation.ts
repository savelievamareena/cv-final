import { gql, useMutation } from "@apollo/client";
import { UploadAvatarInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "@/helpers/notification";
import { RouteParams } from "@/router";
import { GET_PROFILE_QUERY } from "./get-profile-query";

export const UPLOAD_AVATAR = gql`
    mutation UploadAvatar($avatar: UploadAvatarInput!) {
        uploadAvatar(avatar: $avatar)
    }
`;

interface UploadAvatarResult {
    avatarStr: string;
}

export const useAvatarUpload = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { showNotification } = useNotificationContext();

    return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(UPLOAD_AVATAR, {
        refetchQueries: [{ query: GET_PROFILE_QUERY, variables: { userId } }],
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
