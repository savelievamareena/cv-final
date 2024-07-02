import { Navigate, useParams } from "react-router-dom";
import { Preview } from "@/modules/cvs/components/preview";
import { useCvBreadcrumbs } from "@/modules/cvs/hooks";
import { routes } from "@/router";

const PreviewWrapper = () => {
    useCvBreadcrumbs("preview");

    const { cvId } = useParams<{ cvId: string }>();
    if (!cvId) {
        return <Navigate to={routes.auth.root} replace />;
    }

    return <Preview cvId={cvId} />;
};

export default PreviewWrapper;
