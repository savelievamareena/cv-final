import { gql, useMutation } from "@apollo/client";
import { CreateCvInput } from "cv-graphql";
import { GET_CVS_QUERY } from "./get-cvs-query";
import { CreateCvResult } from "./cvs.types";

export const CREATE_CV = gql`
    mutation CreateCv($cv: CreateCvInput!) {
        createCv(cv: $cv) {
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

export const useCvCreate = () => {
    return useMutation<CreateCvResult, { cv: CreateCvInput }>(CREATE_CV, {
        refetchQueries: [GET_CVS_QUERY],
    });
};
``;
