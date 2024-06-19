import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserCVs = () => {
    useUserBreadcrumbs("cvs");

    return <div>User CVs content</div>;
};

export default UserCVs;
