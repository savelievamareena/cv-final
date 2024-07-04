import { gql, useMutation } from "@apollo/client";
import { CreateLanguageInput } from "cv-graphql";
import { GET_LANGUAGES_QUERY } from "@/api";
import { CreateLanguageResult } from "./languages.types";

export const CREATE_LANGUAGE = gql`
    mutation CreateLanguage($language: CreateLanguageInput!) {
        createLanguage(language: $language) {
            id
            iso2
            name
            native_name
        }
    }
`;

export const useLanguageCreate = () => {
    return useMutation<CreateLanguageResult, { language: CreateLanguageInput }>(CREATE_LANGUAGE, {
        refetchQueries: [GET_LANGUAGES_QUERY],
    });
};
