import { gql, useMutation } from "@apollo/client";
import { UpdateCvInput } from "cv-graphql";
import { useParams } from "react-router-dom";
import { UpdateCvResult } from "./cvs.types";
import { GET_CV_BY_ID } from "./get-cv-by-id-query";
import { GET_CVS_QUERY } from "./get-cvs-query";
import { useNotificationContext } from "@/helpers/notification";
import i18n from "@/i18n";
import { RouteParams } from "@/router";

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

    const { [RouteParams.CvId]: cvId } = useParams();

    return useMutation<UpdateCvResult, { cv: UpdateCvInput }>(UPDATE_CV, {
        refetchQueries: [{ query: GET_CVS_QUERY }, { query: GET_CV_BY_ID, variables: { cvId } }],
        onCompleted: () => {
            showNotification("success", i18n.t("notifications.cv.updateSuccess"));
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
