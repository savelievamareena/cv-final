import { Flex } from "antd";
import { SkillMastery } from "cv-graphql";
import { useTranslation } from "react-i18next";
import styles from "../preview.module.scss";
import { SkillsCategoryTranslation } from "@/constants";
import { useSortSkillsByCategory } from "@/hooks/skills";

interface SkillsInfoBlockProps {
    skills: SkillMastery[];
}

const SkillsInfoBlock = ({ skills }: SkillsInfoBlockProps) => {
    const { t } = useTranslation();

    const sortedSkills = useSortSkillsByCategory(skills);

    return (
        <>
            {Object.entries(sortedSkills).map(([category, skillList]) => {
                const categoryName = category
                    ? t(`skills.categories.${SkillsCategoryTranslation[category]}`)
                    : t(`skills.categories.other`);
                return (
                    <Flex key={category} vertical>
                        <div className={styles.title}>{categoryName}</div>
                        <div>
                            {skillList?.map((skill, index) => {
                                const isLast = index === skillList.length - 1;
                                return (
                                    <span key={index}>
                                        {skill.name}
                                        {!isLast && ", "}
                                    </span>
                                );
                            })}
                        </div>
                    </Flex>
                );
            })}
        </>
    );
};

export default SkillsInfoBlock;
