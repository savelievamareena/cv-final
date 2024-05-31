import { useMutation, useQuery } from "@apollo/client";
import { CreateSkillInput, DeleteSkillInput, Skill, UpdateSkillInput } from "cv-graphql";
import { getQuery, createMutation, deleteMutation, updateMutation } from "../api/skills";

interface SkillsResult {
    skills: Skill[];
}

export const useSkills = () => {
    const query = useQuery<SkillsResult>(getQuery);

    return { skills: query.data?.skills ?? [], ...query };
};

export const useSkillCreate = () => {
    return useMutation<Skill, { skill: CreateSkillInput }>(createMutation, {
        refetchQueries: [getQuery],
    });
};

export const useSkillUpdate = () => {
    return useMutation<Skill, { skill: UpdateSkillInput }>(updateMutation, {
        refetchQueries: [getQuery],
    });
};

export const useSkillDelete = (skillId: string) => {
    return useMutation<null, { skill: DeleteSkillInput }>(deleteMutation, {
        variables: {
            skill: { skillId },
        },
        refetchQueries: [getQuery],
    });
};
