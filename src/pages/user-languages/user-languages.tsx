import { UserRole } from "cv-graphql";
import { Navigate, useParams } from "react-router-dom";
import { LanguagesDeleteFooter } from "@/modules/users/components/languages-delete-footer";
import { LanguagesList } from "@/modules/users/components/languages-list";
import { useUserBreadcrumbs } from "@/modules/users/hooks";
import { RouteParams, routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const UserLanguages = () => {
    useUserBreadcrumbs("languages");

    const user = useAuthUser();

    const { [RouteParams.UserId]: userId } = useParams();

    if (!user) return null;

    if (!userId) return <Navigate to={routes.users.root} />;

    const canEdit = user.id === userId || user.role === UserRole.Admin;

    return (
        <>
            <LanguagesList userId={userId} canEdit={canEdit} />
            {canEdit && <LanguagesDeleteFooter userId={userId} />}
        </>
    );
};

export default UserLanguages;
