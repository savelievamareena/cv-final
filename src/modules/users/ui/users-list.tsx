import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import ListTemplate from "@/components/list-lemplate/list-template";
import { Action } from "@/components/list-lemplate/actions-menu";
import { ColumnConfig } from "@/components/list-lemplate/table-template";
import { useConfirm } from "@/components/confirm-dialog/";
import { useUserCreate, useUserDelete, useUsersQuery } from "../api";
import { useUserDialog } from "./users-dialog";
import { convertUserToTable, UserTransformed } from "@/helpers/convert/user-table";

const columnConfigs: ColumnConfig<UserTransformed>[] = [
    { name: "first_name", isSorted: true },
    { name: "last_name", isSorted: false },
    { name: "email", isSorted: false },
    { name: "department", isSorted: false },
    { name: "position", isSorted: false },
];

const UsersList = () => {
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

        onUpdate: (id: string) => navigate(`/users/${id}`),
    };

    const openUser = () =>
        openUserDialog({
            title: t("users.addUser"),
            onConfirm: (formData) =>
                void createUser({
                    variables: {
                        user: {
                            first_name: formData.first_name,
                            last_name: formData.last_name,
                            email: formData.email,
                        },
                    },
                }),

            initialValues: { first_name: "", last_name: "", email: "" },
        });

    const convertedUsers = convertUserToTable(users);

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
