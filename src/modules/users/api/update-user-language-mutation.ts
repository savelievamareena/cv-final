import { gql, useMutation } from "@apollo/client";
import { UpdateProfileLanguageInput } from "cv-graphql";
import { ProfileResult } from "./get-profile-query";
import { GET_USER_LANGUAGES_QUERY } from "./get-user-languages-query";
import { useNotificationContext } from "@/helpers/notification";

const UPDATE_USER_LANGUAGE = gql`
    mutation UpdateUserLanguage($language: UpdateProfileLanguageInput!) {
        updateProfileLanguage(language: $language) {
            id
        }
    }
`;

export const useUpdateUserLanguage = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<ProfileResult, { language: UpdateProfileLanguageInput }>(
        UPDATE_USER_LANGUAGE,
        {
            refetchQueries: [GET_USER_LANGUAGES_QUERY],
            onError: (error) => {
                showNotification("error", error.message);
            },
        }
    );
};
