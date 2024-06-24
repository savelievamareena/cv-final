import { useUserBreadcrumbs } from "@/modules/users/hooks";
import { SkillsWrapper } from "@/modules/users/components/skills/skills-wrapper";

const UserSkills = () => {
    useUserBreadcrumbs("skills");

    return <SkillsWrapper />;
};

export default UserSkills;
