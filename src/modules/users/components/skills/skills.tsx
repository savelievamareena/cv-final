import { Mastery, User, UserRole } from "cv-graphql";
import { Button, Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useAddSkill } from "@/modules/users/components/skills-dialog";
import { useProfileQuery, useUserQuery } from "@/modules/users/api";
import { useSkills } from "@/api/get-skills-query";
import { AddSkillSchemaType } from "@/modules/cvs/components/skills-dialog/schemas";
import { PlusOutlined } from "@ant-design/icons";
import { UserSkillsContainer } from "@/modules/users/components/user-skills-container";
import { useAddProfileSkill } from "@/api/add-profile-skill-mutation";
import styles from "@/modules/cvs/components/skills/skills.module.css";

interface userSkillsProps {
    userId: string;
    currentUser: User;
}

const Skills = ({ userId, currentUser }: userSkillsProps) => {
    const { t } = useTranslation();
    const [openSkillDialog] = useAddSkill();

    const { data: profileData, loading: loadingProfile } = useProfileQuery({ userId: userId });
    const { data: userData } = useUserQuery({ userId: userId });
    const [addProfileSkill] = useAddProfileSkill();
    const { data: skillsData, loading: skillsLoading } = useSkills();

    if (loadingProfile || skillsLoading) return <Spin tip="Loading" size="large" />;

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
            {(currentUser.email === userData?.user.email ||
                currentUser.role === UserRole.Admin) && (
                <Button size={"large"} type="text" onClick={openAddSkillDialog}>
                    <PlusOutlined />
                    {t("skills.addSkill")}
                </Button>
            )}

            <UserSkillsContainer
                skills={profileData ? profileData.profile.skills : []}
                userId={userId}
            />
        </Flex>
    );
};

export default Skills;
