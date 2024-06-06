import { gql, useMutation } from "@apollo/client";
import { DeleteLanguageInput } from "cv-graphql";
import { LANGUAGES_QUERY } from "./getLanguagesQuery";

export const DELETE_LANGUAGE = gql`
    mutation DeleteLanguage($language: DeleteLanguageInput!) {
        deleteLanguage(language: $language) {
            affected
        }
    }
`;

export const useLanguageDelete = (languageId: string) => {
    const [deleteLanguage] = useMutation<null, { language: DeleteLanguageInput }>(DELETE_LANGUAGE, {
        variables: {
            language: { languageId },
        },
        refetchQueries: [LANGUAGES_QUERY],
    });
    return [deleteLanguage];
};
