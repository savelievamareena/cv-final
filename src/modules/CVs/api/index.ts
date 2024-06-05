import { gql } from "@apollo/client";

export const CVS = gql`
    query Cvs {
        cvs {
            id
            name
            description
            user {
                id
                email
            }
        }
    }
`;

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

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;
