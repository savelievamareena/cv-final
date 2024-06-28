import { gql, useMutation } from "@apollo/client";
import { UpdateCvInput } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";
import i18n from "@/i18n";
import { UpdateCvResult } from "./cvs.types";
import { GET_CVS_QUERY } from "./get-cvs-query";

export const UPDATE_CV = gql`
    mutation UpdateCV($cv: UpdateCvInput!) {
        updateCv(cv: $cv) {
            id
            name
            education
            description
        }
    }
`;

export const useCvUpdate = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<UpdateCvResult, { cv: UpdateCvInput }>(UPDATE_CV, {
        refetchQueries: [{ query: GET_CVS_QUERY }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.cv.updateSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
