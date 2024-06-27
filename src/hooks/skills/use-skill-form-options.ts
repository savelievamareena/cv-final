import { Mastery, Skill } from "cv-graphql";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SkillsCategoryTranslation } from "@/constants";

const useSkillFormOptions = (
    skillsData: Skill[],
    categoriesData?: { skillCategories: string[] }
) => {
    const { t } = useTranslation();

    return useMemo(() => {
        const skillsOptions = skillsData.map((skill) => ({
            value: skill.name,
            label: skill.name,
        }));

        const categoriesOptions =
            categoriesData?.skillCategories?.map((category) => {
                const categoryName = category
                    ? t(`skills.categories.${SkillsCategoryTranslation[category]}`)
                    : t(`skills.categories.other`);
                return {
                    value: category,
                    label: categoryName,
                };
            }) ?? [];

        const masteryValues = Object.values(Mastery);
        const masteryOptions = masteryValues.map((mastery) => {
            return {
                value: mastery,
                label: t(`skills.mastery.${mastery.toLowerCase()}`),
            };
        });

        return { skillsOptions, categoriesOptions, masteryOptions };
    }, [skillsData, categoriesData]);
};

export default useSkillFormOptions;
