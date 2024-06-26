import { gql, useQuery } from "@apollo/client";
import { SkillsResult } from "./skills.types";

export const GET_SKILLS_QUERY = gql`
    query Skills {
        skills {
            id
            name
            category
        }
    }
`;

export const useSkillsQuery = () => {
    const query = useQuery<SkillsResult>(GET_SKILLS_QUERY);
    return { skills: query.data?.skills ?? [], ...query };
};
