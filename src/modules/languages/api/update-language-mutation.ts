import { gql, useMutation } from "@apollo/client";
import { UpdateLanguageInput } from "cv-graphql";
import { UpdateLanguageResult } from "./languages.types";
import { GET_LANGUAGES_QUERY } from "@/api";

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
        refetchQueries: [GET_LANGUAGES_QUERY],
    });
};
