import { SkillsWrapper } from "@/modules/users/components/skills/skills-wrapper";
import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserSkills = () => {
    useUserBreadcrumbs("skills");

    return <SkillsWrapper />;
};

export default UserSkills;
