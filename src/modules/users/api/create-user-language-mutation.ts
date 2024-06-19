import { gql, useMutation } from "@apollo/client";
import { AddProfileLanguageInput } from "cv-graphql";
import { GET_USER_LANGUAGES_QUERY } from "./get-user-languages-query";
import { useNotificationContext } from "@/helpers/notification";
import { ProfileResult } from "./get-profile-query";

export const CREATE_USER_LANGUAGE_QUERY = gql`
    query CreateUserLanguage($language: AddProfileLanguageInput!) {
        addProfileLanguage(language: $language)
    }
`;

export const useCreateUserLanguage = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<ProfileResult, { language: AddProfileLanguageInput }>(
        CREATE_USER_LANGUAGE_QUERY,
        {
            refetchQueries: [GET_USER_LANGUAGES_QUERY],
            onError: (error) => {
                showNotification("error", error.message);
            },
        }
    );
};
