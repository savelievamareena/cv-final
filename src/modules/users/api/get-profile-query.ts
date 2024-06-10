import { gql, useQuery } from "@apollo/client";
import { Profile } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";

export const PROFILE = gql`
    query Profile($userId: ID!) {
        profile(userId: $userId) {
            id
            created_at
            first_name
            last_name
            full_name
            avatar
        }
    }
`;

interface QueryArgs {
    userId: string;
}

interface ProfileResult {
    profile: Profile;
}

export const useProfile = ({ userId }: QueryArgs) => {
    const { showNotification } = useNotificationContext();

    return useQuery<ProfileResult, QueryArgs>(PROFILE, {
        variables: {
            userId,
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
