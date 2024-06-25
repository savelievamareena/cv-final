import { gql, useMutation } from "@apollo/client";
import { CreateSkillInput } from "cv-graphql";
import { GET_SKILLS_QUERY } from "./get-skills-query";
import { CreateSkillResult } from "./skills.types";

export const CREATE_SKILL = gql`
    mutation CreateSkill($skill: CreateSkillInput!) {
        createSkill(skill: $skill) {
            id
            name
            category
        }
    }
`;

export const useSkillCreate = () => {
    return useMutation<CreateSkillResult, { skill: CreateSkillInput }>(CREATE_SKILL, {
        refetchQueries: [GET_SKILLS_QUERY],
    });
};
