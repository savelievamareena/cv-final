import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Mastery } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { useAddProfileSkill } from "@/api/add-profile-skill-mutation";
import { useSkills } from "@/api/get-skills-query";
import { FullsizeLoader } from "@/components/fullsize-loader";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { useProfileQuery } from "@/modules/users/api";
import { useAddSkill } from "@/modules/users/components/skills-dialog";
import { UserSkillsContainer } from "@/modules/users/components/user-skills-container";
import styles from "./skills.module.scss";

interface userSkillsProps {
    userId: string;
    canEdit: boolean;
}

const Skills = ({ userId, canEdit }: userSkillsProps) => {
    const { t } = useTranslation();
    const [openSkillDialog] = useAddSkill();

    const { data: profileData, loading: loadingProfile } = useProfileQuery({ userId: userId });
    const [addProfileSkill] = useAddProfileSkill();
    const { data: skillsData, loading: skillsLoading } = useSkills();

    if (loadingProfile || skillsLoading) return <FullsizeLoader />;

    const openAddSkillDialog = () =>
        openSkillDialog({
            title: t("skills.addSkill"),
            onConfirm: (values: AddSkillSchemaType) => {
                void addProfileSkill({
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
                name: "",
                category: "",
                mastery: "",
            },
            skillsData: skillsData,
            existingSkillsOnPage: profileData?.profile.skills,
        });

    return (
        <Flex vertical className={styles.skills}>
            {canEdit && (
                <Button size={"large"} type="text" onClick={openAddSkillDialog}>
                    <PlusOutlined />
                    {t("skills.addSkill")}
                </Button>
            )}
            <UserSkillsContainer
                skills={profileData?.profile?.skills ?? []}
                userId={userId}
                canEdit={canEdit}
            />
        </Flex>
    );
};

export default Skills;
