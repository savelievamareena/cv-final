import { useParams } from "react-router-dom";
import { Cv, DeleteCvSkillInput } from "cv-graphql";
import { RouteParams } from "@/router";
import i18n from "@/i18n.ts";
import { gql, useMutation } from "@apollo/client";
import { useNotificationContext } from "@/helpers/notification";
import { GET_CV_BY_ID } from "@/modules/cvs/api/get-cv-by-id-query";

export const DELETE_CV_SKILL = gql`
    mutation deleteCvSkill($skill: DeleteCvSkillInput!) {
        deleteCvSkill(skill: $skill) {
            id
            skills {
                name
            }
        }
    }
`;

export const useDeleteCvSkill = () => {
    const { [RouteParams.CvId]: cvId } = useParams();
    const { showNotification } = useNotificationContext();

    return useMutation<Cv | Promise<Cv>, { skill: DeleteCvSkillInput }>(DELETE_CV_SKILL, {
        refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.skill.deleteSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
