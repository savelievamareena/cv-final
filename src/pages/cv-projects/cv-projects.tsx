import { useCvBreadcrumbs } from "@/modules/cvs/hooks";

const CVProjects = () => {
    useCvBreadcrumbs("projects");

    return <div>CV Projects Table</div>;
};

export default CVProjects;
