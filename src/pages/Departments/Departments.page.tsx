import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import PageTemplate from "@/components/pageTemplate/page-template";
import { Action } from "@/components/pageTemplate/actions-menu";
import { ColumnConfig } from "@/components/pageTemplate/table-template";
import { useDepartments } from "@/modules/departments/mutation/departments";
import useDialog from "@/helpers/create-dialog";
import ConfirmDialog from "@/components/confirg-dialog/confirm-dialog";

const DepartmentsPage = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const { openDialog, DialogComponent } = useDialog({
        dialog: ConfirmDialog,
        dialogProps: {
            title: t("Delete department?"),
            onConfirm: () => console.log("delete"),
        },
    });

    const menuProps: Action = {
        onDelete: openDialog,
        onUpdate: () => console.log("update"),
    };

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <>
            <PageTemplate
                pageName={t("departent")}
                onButtonClick={() => console.log(12)}
                menuProps={menuProps}
                columnConfigs={columnConfigs}
                searchQuery={searchQuery}
                displayData={departments}
                loading={loading}
                setSearchQuery={setSearchQuery}
            />
            {DialogComponent}
        </>
    );
};

export default DepartmentsPage;
