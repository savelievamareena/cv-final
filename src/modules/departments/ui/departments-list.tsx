import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-template/list-template";
import { useDepartments } from "@/modules/departments/mutation/departments";
import { useConfirm } from "@/components/confirm-dialog/confirm-dialog";
import { Action } from "@/components/list-template/action-menu.types";
import { ColumnConfig } from "@/components/list-template/list-template.types";

const DepartmentsList = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const [openConfirm] = useConfirm();

    const menuProps: Action = {
        onDelete: () =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => console.log("delete confirm"),
            }),

        onUpdate: () => console.log("update"),
    };

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <>
            <ListTemplate
                pageName={t("department")}
                onButtonClick={() => console.log(12)}
                menuProps={menuProps}
                columnConfigs={columnConfigs}
                searchQuery={searchQuery}
                displayData={departments}
                loading={loading}
                setSearchQuery={setSearchQuery}
            />
        </>
    );
};

export default DepartmentsList;
