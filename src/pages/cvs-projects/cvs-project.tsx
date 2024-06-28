import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import CvProjectsList from "@/modules/cvs/ui/project-list";

const CvsProjects = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Projects"));

    return <CvProjectsList />;
};

export default CvsProjects;
