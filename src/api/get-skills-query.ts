import { gql, useQuery } from "@apollo/client";
import { useNotificationContext } from "@/helpers/notification";
import { SkillsResult } from "@/modules/skills/api/skills.types.ts";

export const GET_SKILLS_QUERY = gql`
    query Skills {
        skills {
            id
            created_at
            name
            category
        }
    }
`;

export const useSkills = () => {
    const { showNotification } = useNotificationContext();

    return useQuery<SkillsResult>(GET_SKILLS_QUERY, {
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
