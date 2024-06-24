import { Mastery, SkillMastery } from "cv-graphql";
import { SkillsByCategory } from "@/modules/cvs/cv.types";
import { useMemo } from "react";

const useSortSkillsByCategory = (skills: SkillMastery[] | []): SkillsByCategory => {
    return useMemo(() => {
        return skills.reduce((acc: SkillsByCategory, skill: SkillMastery) => {
            const category = skill.category as Mastery;
            return {
                ...acc,
                [category]: [...(acc[category] || []), skill],
            };
        }, {} as SkillsByCategory);
    }, [skills]);
};

export default useSortSkillsByCategory;
