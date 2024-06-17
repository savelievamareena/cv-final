import { Spin } from "antd";
import { useProjectQuery } from "../../api";
import { ProjectDetailsForm } from "../project-details-form";

interface ProjectDetailsFormProps {
    projectId: string;
}

const ProjectDetailsContent = ({ projectId }: ProjectDetailsFormProps) => {
    const { project, loading } = useProjectQuery({ projectId });

    if (!project && loading) return <Spin size="large" />;

    if (!project) return null;

    return <ProjectDetailsForm project={project} />;
};

export default ProjectDetailsContent;
