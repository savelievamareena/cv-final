import { Mastery, User, UserRole } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { Button, Flex, Spin } from "antd";
import { useCvById } from "@/modules/cvs/api";
import { SkillsContainer } from "src/components/skills-container";
import { useAddSkill } from "@/modules/cvs/components/skills-dialog";
import { useAddCvSkill } from "@/api/add-cv-skill-mutation";
import { useSkills } from "@/api/get-skills-query";
import { PlusOutlined } from "@ant-design/icons";
import { AddSkillSchemaType } from "src/modules/cvs/components/skills-dialog/schemas";
import styles from "./skills.module.css";

interface SkillProps {
    cvId: string;
    currentUser: User;
}

const Skills = ({ cvId, currentUser }: SkillProps) => {
    const { t } = useTranslation();
    const [openSkillDialog] = useAddSkill();

    const [addCvSkill] = useAddCvSkill();
    const { data: cvData, loading: loadingCv } = useCvById(cvId);
    const { data: skillsData, loading: skillsLoading } = useSkills();

    if (loadingCv || skillsLoading) return <Spin tip="Loading" size="large" />;

    const openAddSkillDialog = () =>
        openSkillDialog({
            title: t("skills.addSkill"),
            onConfirm: (values: AddSkillSchemaType) => {
                void addCvSkill({
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
                name: "",
                category: "",
                mastery: "",
            },
            skillsData: skillsData,
            existingSkillsOnPage: cvData?.cv.skills,
        });

    return (
        <Flex vertical className={styles.skills}>
            {(currentUser.email == cvData?.cv?.user?.email ||
                currentUser.role === UserRole.Admin) && (
                <Button size={"large"} type="text" onClick={openAddSkillDialog}>
                    <PlusOutlined />
                    {t("skills.addSkill")}
                </Button>
            )}

            <SkillsContainer skills={cvData ? cvData.cv.skills : []} cvId={cvId} />
        </Flex>
    );
};

export default Skills;
