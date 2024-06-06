import { Skill } from "cv-graphql";

export interface SkillsResult {
    skills: Skill[];
}

export interface CreateSkillResult {
    createSkill: Skill;
}

export interface UpdateSkillResult {
    updateSkill: Skill;
}
