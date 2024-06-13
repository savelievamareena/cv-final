import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserSkills = () => {
    useUserBreadcrumbs("skills");

    return <div>User languages content</div>;
};

export default UserSkills;
