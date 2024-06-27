import CvProjectsList from "@/modules/cvs/ui/project-list";
import { useUserBreadcrumbs } from "@/modules/users/hooks";

const CvsProjects = () => {
    useUserBreadcrumbs();

    return <CvProjectsList />;
};

export default CvsProjects;
