import { gql, useMutation } from "@apollo/client";
import { DeleteAvatarInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "@/helpers/notification";
import { RouteParams } from "@/router";
import { PROFILE } from "./get-profile-query";

export const DELETE_AVATAR = gql`
    mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
        deleteAvatar(avatar: $avatar)
    }
`;

export const useAvatarDelete = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { showNotification } = useNotificationContext();

    return useMutation<void, { avatar: DeleteAvatarInput }>(DELETE_AVATAR, {
        refetchQueries: [{ query: PROFILE, variables: { userId } }],
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
