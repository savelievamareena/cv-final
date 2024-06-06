import { USER_CVS } from "@/modules/users/api";
import { gql, useMutation } from "@apollo/client";
import { CreateCvInput } from "cv-graphql";
import { CreateCvResult } from "./CVs.types";
import { CVS_QUERY } from "./getCVsQuery";

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
        refetchQueries: [CVS_QUERY, USER_CVS],
    });
};
``;
