import { gql, useMutation } from "@apollo/client";
import { UpdateLanguageInput } from "cv-graphql";
import { LANGUAGES_QUERY } from "./get-languages-query";
import { UpdateLanguageResult } from "./languages.types";

export const UPDATE_LANGUAGE = gql`
    mutation UpdateLanguage($language: UpdateLanguageInput!) {
        updateLanguage(language: $language) {
            id
            iso2
            name
            native_name
        }
    }
`;

export const useLanguageUpdate = () => {
    return useMutation<UpdateLanguageResult, { language: UpdateLanguageInput }>(UPDATE_LANGUAGE, {
        refetchQueries: [LANGUAGES_QUERY],
    });
};
