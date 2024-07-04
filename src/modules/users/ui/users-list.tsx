import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm-dialog/";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ListTemplate } from "@/components/list-lemplate/list-template";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { mapUserToTable, UserTransformed } from "@/helpers/convert/maps";
import { routes } from "@/router";
import { useUserCreate, useUserDelete, useUsersQuery } from "../api";
import { useUserDialog } from "./users-dialog";

const columnConfigs: ColumnConfig<UserTransformed>[] = [
    { name: "first_name", isSorted: true },
    { name: "last_name", isSorted: true },
    { name: "email", isSorted: true },
    { name: "department", isSorted: true },
    { name: "position", isSorted: true },
    { name: "avatar", isSorted: false },
];

const UsersList = () => {
    const { t } = useTranslation();

    const { users, loading } = useUsersQuery();
    const navigate = useNavigate();

    const [openConfirm] = useConfirm();
    const [openUserDialog] = useUserDialog();
    const [createUser] = useUserCreate();
    const [deleteUser] = useUserDelete();

    const menuProps: Action = {
        onDelete: (id: string) =>
            openConfirm({
                title: t("delete confirmation"),
                onConfirm: () => void deleteUser({ variables: { user: { userId: id } } }),
            }),

        onUpdate: (id: string) => navigate(routes.users.userById(id)),
    };

    const openUser = () =>
        openUserDialog({
            title: t("users.addUser"),
            onConfirm: (formData) =>
                void createUser({
                    variables: {
                        user: {
                            auth: {
                                email: formData.email,
                                password: formData.password,
                            },
                            profile: {
                                first_name: formData.first_name,
                                last_name: formData.last_name,
                            },
                            cvsIds: [],
                            departmentId: formData.department,
                            positionId: formData.department,
                        },
                    },
                }),

            initialValues: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                department: "",
                position: "",
            },
        });

    const convertedUsers = mapUserToTable(users);

    return (
        <ListTemplate
            pageName={t("users.user")}
            onButtonClick={openUser}
            menuProps={menuProps}
            columnConfigs={columnConfigs}
            displayData={convertedUsers}
            loading={loading}
        />
    );
};

export default UsersList;
