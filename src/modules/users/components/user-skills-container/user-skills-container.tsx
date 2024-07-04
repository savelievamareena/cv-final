import { Flex } from "antd";
import { Mastery, SkillMastery } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { useSkills } from "@/api/get-skills-query";
import { useUpdateProfileSkill } from "@/api/update-profile-skill-mutation";
import { ProgressBar } from "@/components/progress-bar";
import { SkillsCategoryTranslation, SkillsMastery } from "@/constants";
import { useSortSkillsByCategory } from "@/hooks/skills";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import type { SkillsByCategory } from "@/modules/cvs/cv.types";
import { useAddSkill } from "@/modules/users/components/skills-dialog";
import styles from "./user-skills-container.module.scss";

interface UserSkillsContainerProps {
    skills: SkillMastery[];
    userId: string;
    canEdit: boolean;
}

const UserSkillsContainer = ({ skills, userId, canEdit }: UserSkillsContainerProps) => {
    const { t } = useTranslation();
    const [openSkillDialog] = useAddSkill();
    const [updateProfileSkill] = useUpdateProfileSkill();
    const { data: skillsData } = useSkills();

    const skillsByCategory: SkillsByCategory = useSortSkillsByCategory(skills);

    if (!skills.length) {
        return <Flex justify="center">{t("skills.noSkills")}</Flex>;
    }

    const handleSkillSelected = (skill: SkillMastery) => {
        openUpdateSkillDialog(skill);
    };

    const openUpdateSkillDialog = (skill: SkillMastery) =>
        openSkillDialog({
            title: t("skills.updateSkill"),
            onConfirm: (values: AddSkillSchemaType) => {
                void updateProfileSkill({
                    variables: {
                        skill: {
                            userId,
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
                            {skillList?.map((skill) => {
                                return (
                                    <ProgressBar
                                        handleSkillSelected={handleSkillSelected}
                                        key={skill.name}
                                        skill={skill}
                                        percent={SkillsMastery[skill.mastery].percent}
                                        strokeColor={SkillsMastery[skill.mastery].color}
                                        canEdit={canEdit}
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

export default UserSkillsContainer;
