import { gql, useMutation } from "@apollo/client";
import { DeleteProfileSkillInput, Profile } from "cv-graphql";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "@/helpers/notification";
import i18n from "@/i18n.ts";
import { GET_PROFILE_QUERY } from "@/modules/users/api/get-profile-query";
import { RouteParams } from "@/router";

export const DELETE_PROFILE_SKILL = gql`
    mutation deleteProfileSkill($skill: DeleteProfileSkillInput!) {
        deleteProfileSkill(skill: $skill) {
            id
            skills {
                name
            }
        }
    }
`;

export const useDeleteProfileSkill = () => {
    const { [RouteParams.UserId]: userId } = useParams();
    const { showNotification } = useNotificationContext();

    return useMutation<Profile, { skill: DeleteProfileSkillInput }>(DELETE_PROFILE_SKILL, {
        refetchQueries: [{ query: GET_PROFILE_QUERY, variables: { userId } }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.skill.deleteSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
