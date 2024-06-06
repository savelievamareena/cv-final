import { gql, useMutation } from "@apollo/client";
import { DeleteAvatarInput, UploadAvatarInput } from "cv-graphql";
import { PROFILE } from "./profile";

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
    return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(UPLOAD_AVATAR, {
        refetchQueries: [PROFILE],
        onError: (error) => {
            console.error(error.message);
        },
    });
};

export const useDeleteAvatar = () => {
    return useMutation<UploadAvatarResult, { avatar: DeleteAvatarInput }>(DELETE_AVATAR, {
        refetchQueries: [PROFILE],
        onError: (error) => {
            console.error(error.message);
        },
    });
};
