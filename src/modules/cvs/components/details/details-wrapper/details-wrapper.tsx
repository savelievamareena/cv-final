import { Navigate, useParams } from "react-router-dom";
import { Details } from "@/modules/cvs/components/details";
import { useCvBreadcrumbs } from "@/modules/cvs/hooks";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

const DetailsWrapper = () => {
    const { cvId } = useParams<{ cvId: string }>();
    const currentUser = useAuthUser();
    useCvBreadcrumbs("details");

    if (!cvId || !currentUser) {
        return <Navigate to={routes.cvs.root} replace />;
    }

    return <Details cvId={cvId} currentUserEmail={currentUser.email} />;
};

export default DetailsWrapper;
