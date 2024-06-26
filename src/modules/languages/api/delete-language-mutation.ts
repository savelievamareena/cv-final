import { gql, useMutation } from "@apollo/client";
import { DeleteLanguageInput } from "cv-graphql";
import { GET_LANGUAGES_QUERY } from "@/api";

export const DELETE_LANGUAGE = gql`
    mutation DeleteLanguage($language: DeleteLanguageInput!) {
        deleteLanguage(language: $language) {
            affected
        }
    }
`;

export const useLanguageDelete = () => {
    const [deleteLanguage] = useMutation<null, { language: DeleteLanguageInput }>(DELETE_LANGUAGE, {
        refetchQueries: [GET_LANGUAGES_QUERY],
    });
    return [deleteLanguage];
};
