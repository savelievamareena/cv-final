import { useGenericBreadcrumbs } from "@/hooks";
import { UsersList } from "@/modules/users/";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Employees"));

    return <UsersList />;
};

export default UsersPage;
