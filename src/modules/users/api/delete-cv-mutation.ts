import { gql, useMutation } from "@apollo/client";
import { DeleteCvInput } from "cv-graphql";
import { GET_USER_CVS_QUERY } from "./get-user-cvs";

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;

export const useCvDelete = () => {
    return useMutation<null, { cv: DeleteCvInput }>(DELETE_CV, {
        refetchQueries: [GET_USER_CVS_QUERY],
    });
};
