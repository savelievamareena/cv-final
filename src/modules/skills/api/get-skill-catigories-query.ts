import { gql, useQuery } from "@apollo/client";
import { SkillsCategoriesResult } from "./skills.types";

const GET_SKILL_CATEGORIES = gql`
    query SkillCategoriesQuery {
        skillCategories
    }
`;

export const useSkillCategoriesQuery = () => {
    const query = useQuery<SkillsCategoriesResult>(GET_SKILL_CATEGORIES);

    return { skillCategories: query.data?.skillCategories ?? [], ...query };
};
