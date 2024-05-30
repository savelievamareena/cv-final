import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useDepartments } from "@/modules/departments/mutation/departments";
import ConfirmDialog from "@/components/confirg-dialog/confirm-dialog";
import useDialog from "@/helpers/create-dialog";

const DepartmentsList = () => {
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
            {DialogComponent}
        </>
    );
};

export default DepartmentsList;
