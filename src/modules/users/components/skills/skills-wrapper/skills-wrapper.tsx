import { Navigate, useParams } from "react-router-dom";
import { useAuthUser } from "@/services/auth-service";
import { routes } from "@/router";
import { Skills } from "@/modules/users/components/skills";

const SkillsWrapper = () => {
    const { userId } = useParams<{ userId: string }>();
    const currentUser = useAuthUser();
    if (!userId || !currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    return <Skills />;
};

export default SkillsWrapper;
