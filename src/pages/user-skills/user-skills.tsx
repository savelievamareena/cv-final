import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserSkills = () => {
    useUserBreadcrumbs("skills");

    return <div>User skills content</div>;
};

export default UserSkills;
