import { Department } from "cv-graphql";
import { t } from "i18next";
import { useDepartmentsQuery } from "@/api";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import ListTemplate from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useDepartmentCreate, useDepartmentDelete, useDepartmentUpdate } from "../api";
import { useAddDepartment } from "./departments-dialog";

const DepartmentsList = () => {
    const { departments, loading } = useDepartmentsQuery();

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
                onConfirm: (formData) =>
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
            onConfirm: (formData) =>
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
                displayData={departments}
                loading={loading}
            />
        </>
    );
};

export default DepartmentsList;
