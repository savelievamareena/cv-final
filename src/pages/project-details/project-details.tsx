import { Navigate, useParams } from "react-router-dom";
import { ProjectDetailsContent } from "@/modules/projects/components/project-details-content";
import { useProjectBreadcrumbs } from "@/modules/projects/hooks";
import { RouteParams, routes } from "@/router";

const ProjectDetails = () => {
    const { [RouteParams.ProjectId]: projectId } = useParams();

    useProjectBreadcrumbs();

    if (!projectId) return <Navigate to={routes.projects.root} />;

    return <ProjectDetailsContent projectId={projectId} />;
};

export default ProjectDetails;
