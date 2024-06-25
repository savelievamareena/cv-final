import { gql, useMutation } from "@apollo/client";
import { UpdateSkillInput } from "cv-graphql";
import { GET_SKILLS_QUERY } from "./get-skills-query";
import { UpdateSkillResult } from "./skills.types";

export const UPDATE_SKILL = gql`
    mutation UpdateSkill($skill: UpdateSkillInput!) {
        updateSkill(skill: $skill) {
            id
            name
            category
        }
    }
`;

export const useSkillUpdate = () => {
    return useMutation<UpdateSkillResult, { skill: UpdateSkillInput }>(UPDATE_SKILL, {
        refetchQueries: [GET_SKILLS_QUERY],
    });
};
