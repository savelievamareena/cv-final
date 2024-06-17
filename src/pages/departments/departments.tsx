import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import DepartmentsList from "@/modules/departments/ui/departments-list";
import { routes } from "@/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Departments = () => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [{ title: t("Home"), href: routes.root }, { title: t("Departments") }],
        [t]
    );

    useBreadcrumbs(items);

    return <DepartmentsList />;
};

export default Departments;
