import { gql, useQuery } from "@apollo/client";
import { Profile } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const GET_PROFILE_QUERY = gql`
    query Profile($userId: ID!) {
        profile(userId: $userId) {
            id
            created_at
            first_name
            last_name
            full_name
            avatar
            skills {
                name
                category
                mastery
            }
        }
    }
`;

export interface ProfileQueryArgs {
    userId?: string;
}

export interface ProfileResult {
    profile: Profile;
}

export const useProfileQuery = ({ userId }: ProfileQueryArgs) => {
    const { showNotification } = useNotificationContext();

    return useQuery<ProfileResult, ProfileQueryArgs>(GET_PROFILE_QUERY, {
        variables: {
            userId,
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
