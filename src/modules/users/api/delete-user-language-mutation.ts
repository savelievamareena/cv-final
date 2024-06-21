import { gql, useMutation } from "@apollo/client";
import { DeleteProfileLanguageInput } from "cv-graphql";
import { GET_USER_LANGUAGES_QUERY } from "./get-user-languages-query";
import { useNotificationContext } from "@/helpers/notification";
import { ProfileResult } from "./get-profile-query";

export const DELETE_USER_LANGUAGE_QUERY = gql`
    mutation DeleteUserLanguage($language: DeleteProfileLanguageInput!) {
        deleteProfileLanguage(language: $language) {
            id
        }
    }
`;

export const useDeleteUserLanguage = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<ProfileResult, { language: DeleteProfileLanguageInput }>(
        DELETE_USER_LANGUAGE_QUERY,
        {
            refetchQueries: [GET_USER_LANGUAGES_QUERY],
            onError: (error) => {
                showNotification("error", error.message);
            },
        }
    );
};
