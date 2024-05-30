import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useDepartments } from "@/modules/departments/mutation/departments";
import { useConfirm } from "@/components/confirg-dialog/confirm-dialog";

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
                pageName={t("departent")}
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
