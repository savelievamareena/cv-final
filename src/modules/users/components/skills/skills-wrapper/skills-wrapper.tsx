import { Navigate, useParams } from "react-router-dom";
import { Skills } from "@/modules/users/components/skills";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const SkillsWrapper = () => {
    const { userId } = useParams<{ userId: string }>();
    const currentUser = useAuthUser();
    if (!userId || !currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    return <Skills userId={userId} currentUser={currentUser} />;
};

export default SkillsWrapper;
