import { UserRole } from "cv-graphql";
import { Navigate, useParams } from "react-router-dom";
import { SkillsDeleteFooter } from "../skills-delete-footer";
import { Skills } from "@/modules/users/components/skills";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const SkillsWrapper = () => {
    const { userId } = useParams<{ userId: string }>();
    const currentUser = useAuthUser();

    if (!userId || !currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    const canEdit = userId === currentUser.id || currentUser.role === UserRole.Admin;

    return (
        <>
            <Skills canEdit={canEdit} userId={userId} />
            {canEdit && <SkillsDeleteFooter userId={userId} />}
        </>
    );
};

export default SkillsWrapper;
