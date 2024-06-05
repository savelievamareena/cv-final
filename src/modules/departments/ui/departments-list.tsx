import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import {
    useDepartmentCreate,
    useDepartmentDelete,
    useDepartments,
    useDepartmentUpdate,
} from "@/modules/departments/mutation/departments";
import { useConfirm } from "@/components/confirg-dialog/confirm-dialog";
import { useAddDepartment } from "./departments-dialog";

interface FormData {
    department: string;
}

const DepartmentsList = () => {
    const { departments, loading } = useDepartments();
    const [searchQuery, setSearchQuery] = useState("");

    const [openConfirm] = useConfirm();
    const [openAddDepartment] = useAddDepartment();
    const [createDepartment] = useDepartmentCreate();
    const [deleteDepartment] = useDepartmentDelete();
    const [updateDepartment] = useDepartmentUpdate();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () =>
                    void deleteDepartment({ variables: { department: { departmentId: id } } }),
            }),

        onUpdate: (id: string) =>
            openAddDepartment({
                title: t("Update department"),
                onConfirm: (formData: FormData) =>
                    void updateDepartment({
                        variables: {
                            department: {
                                name: formData.department,
                                departmentId: id,
                            },
                        },
                    }),
                defaultValue: {
                    name: departments.find((department) => department.id === id)?.name ?? "",
                },
            }),
    };

    const openDepartment = () =>
        openAddDepartment({
            title: t("Add department"),
            onConfirm: (formData: FormData) =>
                void createDepartment({
                    variables: {
                        department: {
                            name: formData.department,
                        },
                    },
                }),
            defaultValue: { name: "" },
        });

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <>
            <ListTemplate
                pageName={t("departent")}
                onButtonClick={openDepartment}
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
