import { useParams } from "react-router-dom";
import { AddProfileSkillInput, Profile } from "cv-graphql";
import { gql, useMutation } from "@apollo/client";
import { RouteParams } from "@/router";
import i18n from "@/i18n";
import { useNotificationContext } from "@/helpers/notification";
import { GET_PROFILE_QUERY } from "@/modules/users/api/get-profile-query";

export const ADD_PROFILE_SKILL = gql`
    mutation addProfileSkill($skill: AddProfileSkillInput!) {
        addProfileSkill(skill: $skill) {
            id
            skills {
                name
                category
                mastery
            }
        }
    }
`;

export const useAddProfileSkill = () => {
    const { [RouteParams.UserId]: userId } = useParams();
    const { showNotification } = useNotificationContext();

    return useMutation<Profile, { skill: AddProfileSkillInput }>(ADD_PROFILE_SKILL, {
        refetchQueries: [{ query: GET_PROFILE_QUERY, variables: { userId } }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.skill.addSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
