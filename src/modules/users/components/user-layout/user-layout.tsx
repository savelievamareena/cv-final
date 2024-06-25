import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import { generateUserTabs } from "../../helpers";
import { PageTabs } from "@/components/page-tabs";
import { RouteParams, routes } from "@/router";

const UserLayout = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { i18n } = useTranslation();

    const items = useMemo(() => generateUserTabs(userId), [userId, i18n.language]);

    if (!userId) return <Navigate to={routes.root} />;

    return <PageTabs items={items} />;
};

export default UserLayout;
