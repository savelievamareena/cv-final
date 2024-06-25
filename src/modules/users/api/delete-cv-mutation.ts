import { gql, useMutation } from "@apollo/client";
import { DeleteCvInput } from "cv-graphql";
import { GET_CV_BY_ID } from "./get-cv-by-id-query";

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;

export const useCvDelete = () => {
    return useMutation<null, { cv: DeleteCvInput }>(DELETE_CV, {
        refetchQueries: [GET_CV_BY_ID],
    });
};
