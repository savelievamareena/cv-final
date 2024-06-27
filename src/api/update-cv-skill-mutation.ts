import { gql, useMutation } from "@apollo/client";
import { Cv, UpdateCvSkillInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "@/helpers/notification";
import i18n from "@/i18n.ts";
import { GET_CV_BY_ID } from "@/modules/cvs/api/get-cv-by-id-query";
import { RouteParams } from "@/router";

export const UPDATE_CV_SKILL = gql`
    mutation updateCvSkill($skill: UpdateCvSkillInput!) {
        updateCvSkill(skill: $skill) {
            id
            skills {
                name
                category
                mastery
            }
        }
    }
`;

export const useUpdateCvSkill = () => {
    const { [RouteParams.CvId]: cvId } = useParams();
    const { showNotification } = useNotificationContext();

    return useMutation<Cv, { skill: UpdateCvSkillInput }>(UPDATE_CV_SKILL, {
        refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.skill.updateSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
