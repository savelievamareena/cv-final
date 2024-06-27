import { Mastery, SkillMastery } from "cv-graphql";
import { useMemo } from "react";
import { SkillsByCategory } from "@/modules/cvs/cv.types";

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
