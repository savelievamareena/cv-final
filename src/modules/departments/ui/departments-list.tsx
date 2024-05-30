import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useDepartments } from "@/modules/departments/mutation/departments";

const DepartmentsList = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const menuProps: Action = {
        onDelete: () => console.log("delete"),
        onUpdate: () => console.log("update"),
    };

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <ListTemplate
            pageName={t("departent")}
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

export default DepartmentsList;
