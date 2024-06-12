import { useState } from "react";
import { Department } from "cv-graphql";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import {
    useDepartmentCreate,
    useDepartmentDelete,
    useDepartmentsQuery,
    useDepartmentUpdate,
} from "../api";
import { useAddDepartment } from "./departments-dialog";

interface FormData {
    department: string;
}

const DepartmentsList = () => {
    const { departments, loading } = useDepartmentsQuery();
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
                initialValues: {
                    department: departments.find((department) => department.id === id)?.name ?? "",
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
            initialValues: { department: "" },
        });

    const columnConfigs: ColumnConfig<Department>[] = [{ name: "name", isSorted: true }];

    return (
        <>
            <ListTemplate
                pageName={t("department")}
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
