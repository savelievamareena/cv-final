import { gql, useMutation } from "@apollo/client";
import { UpdateSkillInput } from "cv-graphql";
import { UpdateSkillResult } from "./skills.types";
import { SKILLS_QUERY } from "./getSkillsQuery";

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
        refetchQueries: [SKILLS_QUERY],
    });
};
