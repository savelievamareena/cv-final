import { gql, useQuery } from "@apollo/client";
import { useNotificationContext } from "@/helpers/notification";

export const GET_SKILLS_CATEGORIES_QUERY = gql`
    query SkillCategories {
        skillCategories
    }
`;

export const useSkillCategories = () => {
    const { showNotification } = useNotificationContext();

    return useQuery<{ skillCategories: string[] }>(GET_SKILLS_CATEGORIES_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
