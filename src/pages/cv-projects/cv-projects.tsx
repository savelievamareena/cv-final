import { useCvBreadcrumbs } from "@/modules/cvs/hooks";
import CvProjectsList from "@/modules/cvs/ui/project-list";

const CVProjects = () => {
    useCvBreadcrumbs("projects");

    return <CvProjectsList />;
};

export default CVProjects;
