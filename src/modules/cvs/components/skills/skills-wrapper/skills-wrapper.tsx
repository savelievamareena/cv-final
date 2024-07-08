import { Navigate, useParams } from "react-router-dom";
import { Skills } from "@/modules/cvs/components/skills";
import { useCvBreadcrumbs } from "@/modules/cvs/hooks";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const SkillsWrapper = () => {
    useCvBreadcrumbs("skills");
    const { cvId } = useParams<{ cvId: string }>();
    const currentUser = useAuthUser();
    if (!cvId) return <Navigate to={routes.cvs.root} replace />;

    if (!currentUser) return <Navigate to={routes.auth.root} replace />;

    return <Skills cvId={cvId} currentUser={currentUser} />;
};

export default SkillsWrapper;
