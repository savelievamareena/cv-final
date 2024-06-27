import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import { ProjectsList } from "@/modules/projects";

const ProjectsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Projects"));

    return <ProjectsList />;
};

export default ProjectsPage;
