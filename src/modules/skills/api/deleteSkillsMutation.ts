import { gql, useMutation } from "@apollo/client";
import { DeleteResult, DeleteSkillInput } from "cv-graphql";
import { SKILLS_QUERY } from "./getSkillsQuery";

export const DELETE_SKILL = gql`
    mutation DeleteSkill($skill: DeleteSkillInput!) {
        deleteSkill(skill: $skill) {
            affected
        }
    }
`;

export const useSkillDelete = () => {
    return useMutation<DeleteResult, { skill: DeleteSkillInput }>(DELETE_SKILL, {
        refetchQueries: [SKILLS_QUERY],
    });
};
