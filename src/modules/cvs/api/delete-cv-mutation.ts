import { gql, useMutation } from "@apollo/client";
import { DeleteCvInput } from "cv-graphql";
import { GET_CVS_QUERY } from "./get-cvs-query";

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;

export const useCvDelete = () => {
    return useMutation<null, { cv: DeleteCvInput }>(DELETE_CV, {
        refetchQueries: [GET_CVS_QUERY],
    });
};
