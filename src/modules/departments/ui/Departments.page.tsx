import { useDepartments } from "../mutation/departments";
import { useState } from "react";
import { Department } from "cv-graphql";
import PageTemplate from "@/components/pageTemplate/PageTemplate";
import { Action } from "@/components/pageTemplate/ActionsMenu";
import { t } from "i18next";

const DepartmentsPage = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action[] = [
        {
            tittle: "Delete",
            onClick: () => console.log("Delete department"),
        },
        {
            tittle: "Update",
            onClick: () => console.log("Update department"),
        },
    ];

    const columnNames: (keyof Department)[] = ["name"];

    return (
        <PageTemplate
            pageTitle={t("Add departent")}
            onButtonClick={() => console.log(12)}
            menuProps={menuProps}
            columnNames={columnNames}
            searchQuery={searchQuery}
            displayData={departments}
            loading={loading}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default DepartmentsPage;
