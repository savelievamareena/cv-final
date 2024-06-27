import { Flex } from "antd";
import { Mastery, SkillMastery } from "cv-graphql";
import { useTranslation } from "react-i18next";
import styles from "./user-skills-container.module.scss";
import type { SkillsByCategory } from "@/modules/cvs/cv.types";
import { useSkills } from "@/api/get-skills-query";
import { useUpdateProfileSkill } from "@/api/update-profile-skill-mutation";
import { ProgressBar } from "@/components/progress-bar";
import { SkillsCategoryTranslation, SkillsMastery } from "@/constants";
import { useSortSkillsByCategory } from "@/hooks/skills";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { useAddSkill } from "@/modules/users/components/skills-dialog";

interface UserSkillsContainerProps {
    skills: SkillMastery[];
    userId: string;
}

const UserSkillsContainer = ({ skills, userId }: UserSkillsContainerProps) => {
    const { t } = useTranslation();
    const [openSkillDialog] = useAddSkill();
    const [updateProfileSkill] = useUpdateProfileSkill();
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
                            {skillList?.map((skill) => {
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

export default UserSkillsContainer;
