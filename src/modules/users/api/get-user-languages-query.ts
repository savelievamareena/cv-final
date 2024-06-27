import { gql, useQuery } from "@apollo/client";
import { ProfileQueryArgs, ProfileResult } from "./get-profile-query";
import { useNotificationContext } from "@/helpers/notification";

export const GET_USER_LANGUAGES_QUERY = gql`
    query UserLanguages($userId: ID!) {
        profile(userId: $userId) {
            id
            languages {
                name
                proficiency
            }
        }
    }
`;

export const useUserLanguages = ({ userId }: ProfileQueryArgs) => {
    const { showNotification } = useNotificationContext();

    return useQuery<ProfileResult, ProfileQueryArgs>(GET_USER_LANGUAGES_QUERY, {
        variables: {
            userId,
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
