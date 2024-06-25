import { ProgressBar } from "@/components/progress-bar";
import { SkillsCategoryTranslation, SkillsMastery } from "@/constants";
import { useTranslation } from "react-i18next";
import { Mastery, SkillMastery } from "cv-graphql";
import { Flex } from "antd";
import { useSortSkillsByCategory } from "@/hooks";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { useAddSkill } from "@/modules/cvs/components/skills-dialog";
import { useUpdateCvSkill } from "@/api/update-cv-skill-mutation";
import { useSkills } from "@/api/get-skills-query";
import type { SkillsByCategory } from "@/modules/cvs/cv.types";
import styles from "./skills-container.module.scss";

interface SkillsWrapperProps {
    skills: SkillMastery[];
    cvId: string;
}

const SkillsContainer = ({ skills, cvId }: SkillsWrapperProps) => {
    const [openSkillDialog] = useAddSkill();
    const [updateCvSkill] = useUpdateCvSkill();
    const { data: skillsData } = useSkills();

    if (skills.length < 1) {
        return <Flex justify="center">No skills Added</Flex>;
    }

    const handleSkillSelected = (skill: SkillMastery) => {
        openUpdateSkillDialog(skill);
    };

    const openUpdateSkillDialog = (skill: SkillMastery) =>
        openSkillDialog({
            title: t("skills.updateSkill"),
            onConfirm: (values: AddSkillSchemaType) => {
                void updateCvSkill({
                    variables: {
                        skill: {
                            cvId,
                            name: values.name,
                            category: values.category,
                            mastery: values.mastery as Mastery,
                        },
                    },
                });
            },
            initialValues: {
                name: skill?.name ?? "",
                category: skill?.category ?? "",
                mastery: skill?.mastery ?? "",
            },
            skillsData: skillsData,
            existingSkillsOnPage: skills,
        });

    const { t } = useTranslation();

    const skillsByCategory: SkillsByCategory = useSortSkillsByCategory(skills);

    return (
        <>
            {Object.entries(skillsByCategory).map(([category, skillList]) => {
                const categoryName = category
                    ? t(`skills.categories.${SkillsCategoryTranslation[category]}`)
                    : t(`skills.categories.other`);
                return (
                    <Flex key={category} vertical>
                        <h3>{categoryName}</h3>
                        <Flex className={styles.skills_row}>
                            {(skillList || []).map((skill) => {
                                return (
                                    <ProgressBar
                                        handleSkillSelected={handleSkillSelected}
                                        key={skill.name}
                                        skill={skill}
                                        percent={SkillsMastery[skill.mastery].percent}
                                        strokeColor={SkillsMastery[skill.mastery].color}
                                    />
                                );
                            })}
                        </Flex>
                    </Flex>
                );
            })}
        </>
    );
};

export default SkillsContainer;
