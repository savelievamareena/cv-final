import { gql, useMutation } from "@apollo/client";
import { DeleteResult, DeleteSkillInput } from "cv-graphql";
import { GET_SKILLS_QUERY } from "./get-skills-query";

export const DELETE_SKILL = gql`
    mutation DeleteSkill($skill: DeleteSkillInput!) {
        deleteSkill(skill: $skill) {
            affected
        }
    }
`;

export const useSkillDelete = () => {
    return useMutation<DeleteResult, { skill: DeleteSkillInput }>(DELETE_SKILL, {
        refetchQueries: [GET_SKILLS_QUERY],
    });
};
