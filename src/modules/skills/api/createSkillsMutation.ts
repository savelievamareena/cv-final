import { gql, useMutation } from "@apollo/client";
import { CreateSkillInput } from "cv-graphql";
import { CreateSkillResult } from "./skills.types";
import { SKILLS_QUERY } from "./getSkillsQuery";

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
        refetchQueries: [SKILLS_QUERY],
    });
};
