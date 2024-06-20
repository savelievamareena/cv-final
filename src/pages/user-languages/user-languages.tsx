import { LanguagesList } from "@/modules/users/components/languages-list";
import { useUserBreadcrumbs } from "@/modules/users/hooks";
import { RouteParams, routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { Navigate, useParams } from "react-router-dom";

const UserLanguages = () => {
    useUserBreadcrumbs("languages");

    const user = useAuthUser();

    const { [RouteParams.UserId]: userId } = useParams();

    if (!user) return null;

    if (!userId) return <Navigate to={routes.users.root} />;

    return <LanguagesList userId={userId} canEdit={user.id === userId} />;
};

export default UserLanguages;
