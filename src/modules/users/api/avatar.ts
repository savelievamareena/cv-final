import { gql, useMutation } from "@apollo/client";
import { DeleteAvatarInput, UploadAvatarInput } from "cv-graphql";
import { PROFILE } from "./profile";
import { HEADER_PROFILE } from "@/modules/header/api";
import { RouteParams } from "@/router";
import { useParams } from "react-router-dom";

export const UPLOAD_AVATAR = gql`
    mutation UploadAvatar($avatar: UploadAvatarInput!) {
        uploadAvatar(avatar: $avatar)
    }
`;

export const DELETE_AVATAR = gql`
    mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
        deleteAvatar(avatar: $avatar)
    }
`;

interface UploadAvatarResult {
    avatarStr: string;
}

export const useUploadAvatar = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(UPLOAD_AVATAR, {
        refetchQueries: [PROFILE, { query: HEADER_PROFILE, variables: { userId } }],
        onError: (error) => {
            console.error(error.message);
        },
    });
};

export const useDeleteAvatar = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    return useMutation<UploadAvatarResult, { avatar: DeleteAvatarInput }>(DELETE_AVATAR, {
        refetchQueries: [PROFILE, { query: HEADER_PROFILE, variables: { userId } }],
        onError: (error) => {
            console.error(error.message);
        },
    });
};
