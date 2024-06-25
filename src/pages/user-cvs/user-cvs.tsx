import { useUserBreadcrumbs } from "@/modules/users/hooks";
import CvsList from "@/modules/users/ui/cvs-list";

const UserCVs = () => {
    useUserBreadcrumbs();

    return <CvsList />;
};

export default UserCVs;
