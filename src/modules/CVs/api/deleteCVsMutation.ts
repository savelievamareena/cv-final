import { gql, useMutation } from "@apollo/client";
import { DeleteCvInput } from "cv-graphql";
import { CVS_QUERY } from "./getCVsQuery";

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;

export const useCvDelete = (cvId: string) => {
    return useMutation<null, { cv: DeleteCvInput }>(DELETE_CV, {
        variables: {
            cv: {
                cvId,
            },
        },
        refetchQueries: [CVS_QUERY],
    });
};
