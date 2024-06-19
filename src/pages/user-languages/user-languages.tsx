import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserLanguages = () => {
    useUserBreadcrumbs("languages");

    return <div>User languages content</div>;
};

export default UserLanguages;
