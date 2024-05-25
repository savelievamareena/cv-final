import { useDepartments } from "../mutation/departments";
import { useState } from "react";
import { Department } from "cv-graphql";
import PageTemplate from "@/components/pageTemplate/PageTemplate";
import { Action } from "@/components/pageTemplate/ActionsMenu";

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
