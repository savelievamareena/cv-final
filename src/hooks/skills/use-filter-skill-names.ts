import { SkillMastery } from "cv-graphql";
import { useMemo } from "react";
import { SkillsResult } from "@/modules/skills/api/skills.types";

const useFilterSkillNames = (
    skillsData: SkillsResult | undefined,
    existingSkillsOnPage: SkillMastery[] | undefined
) => {
    return useMemo(() => {
        if (!skillsData || !existingSkillsOnPage) return [];
        const existingSkillsNames = new Set(existingSkillsOnPage.map((skill) => skill.name));

        return skillsData.skills.filter((skill) => !existingSkillsNames.has(skill.name));
    }, [skillsData, existingSkillsOnPage]);
};

export default useFilterSkillNames;
