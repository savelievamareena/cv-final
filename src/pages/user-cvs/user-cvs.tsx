import { useUserBreadcrumbs } from "@/modules/users/hooks";
import CvsList from "@/modules/users/ui/cvs-list";

const UserCVs = () => {
    useUserBreadcrumbs("cvs");

    return <CvsList />;
};

export default UserCVs;
