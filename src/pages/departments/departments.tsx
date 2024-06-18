import { useGenericBreadcrumbs } from "@/hooks";
import DepartmentsList from "@/modules/departments/ui/departments-list";
import { useTranslation } from "react-i18next";

const Departments = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Departments"));

    return <DepartmentsList />;
};

export default Departments;
