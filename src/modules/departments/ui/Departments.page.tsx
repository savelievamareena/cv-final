import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import { useDepartments } from "../mutation/departments";
import PageTemplate from "@/components/pageTemplate/page-template";
import { Action } from "@/components/pageTemplate/actions-menu";
import { ColumnConfig } from "@/components/pageTemplate/table-template";

const DepartmentsPage = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action[] = [
        {
            title: "Delete",
            onClick: () => console.log("Delete department"),
        },
        {
            title: "Update",
            onClick: () => console.log("Update department"),
        },
    ];

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <PageTemplate
            pageTitle={t("Add departent")}
            onButtonClick={() => console.log(12)}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            searchQuery={searchQuery}
            displayData={departments}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default DepartmentsPage;
