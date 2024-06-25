import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import { UsersList } from "@/modules/users/";

const UsersPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Employees"));

    return <UsersList />;
};

export default UsersPage;
