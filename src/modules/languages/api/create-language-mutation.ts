import { gql, useMutation } from "@apollo/client";
import { CreateLanguageInput } from "cv-graphql";
import { CreateLanguageResult } from "./languages.types";
import { LANGUAGES_QUERY } from "./get-languages-query";

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
        refetchQueries: [LANGUAGES_QUERY],
    });
};
