import { Navigate, useParams } from "react-router-dom";
import { Skills } from "@/modules/cvs/components/skills";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const SkillsWrapper = () => {
    const { cvId } = useParams<{ cvId: string }>();
    const currentUser = useAuthUser();
    if (!cvId || !currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    return <Skills cvId={cvId} currentUser={currentUser} />;
};

export default SkillsWrapper;
