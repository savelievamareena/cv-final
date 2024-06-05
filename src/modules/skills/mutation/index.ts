import { useMutation, useQuery } from "@apollo/client";
import { CreateSkillInput, DeleteResult, DeleteSkillInput, UpdateSkillInput } from "cv-graphql";
import { SKILLS, CREATE_SKILL, UPDATE_SKILL, DELETE_SKILL } from "../api";
import { SkillsResult, CreateSkillResult, UpdateSkillResult } from "../api/skills.types";

export const useSkills = () => {
    const query = useQuery<SkillsResult>(SKILLS);
    return { skills: query.data?.skills ?? [], ...query };
};

export const useSkillCreate = () => {
    return useMutation<CreateSkillResult, { skill: CreateSkillInput }>(CREATE_SKILL, {
        refetchQueries: [SKILLS],
    });
};

export const useSkillUpdate = () => {
    return useMutation<UpdateSkillResult, { skill: UpdateSkillInput }>(UPDATE_SKILL, {
        refetchQueries: [SKILLS],
    });
};

export const useSkillDelete = (skillId: string) => {
    return useMutation<DeleteResult, { skill: DeleteSkillInput }>(DELETE_SKILL, {
        variables: {
            skill: {
                skillId,
            },
        },
        refetchQueries: [SKILLS],
    });
};
