import { gql, useMutation } from "@apollo/client";
import { UpdateCvInput } from "cv-graphql";
import { UpdateCvResult } from "./CVs.types";
import { GET_CVS_QUERY } from "./get-cvs-query";

export const UPDATE_CV = gql`
    mutation UpdateCv($cv: UpdateCvInput!) {
        updateCv(cv: $cv) {
            id
            name
            education
            description
            user {
                id
                email
            }
        }
    }
`;

export const useCvUpdate = () => {
    return useMutation<UpdateCvResult, { cv: UpdateCvInput }>(UPDATE_CV, {
        refetchQueries: [GET_CVS_QUERY],
    });
};
