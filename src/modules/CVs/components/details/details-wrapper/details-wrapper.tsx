import { Navigate, useParams } from "react-router-dom";
import { useAuthUser } from "@/services/auth-service";
import { routes } from "@/router";
import { Details } from "@/modules/cvs/components/details";

const DetailsWrapper = () => {
    const { cvId } = useParams<{ cvId: string }>();
    const currentUser = useAuthUser();

    if (!cvId || !currentUser) {
        return <Navigate to={routes.auth.root} replace />;
    }

    return <Details cvId={cvId} currentUserEmail={currentUser.email} />;
};

export default DetailsWrapper;
