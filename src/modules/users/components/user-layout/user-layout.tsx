import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { PageTabs } from "@/components/page-tabs";
import { RouteParams, routes } from "@/router";
import { generateUserTabs } from "../../helpers";
import { useTranslation } from "react-i18next";

import styles from "./user-layout.module.scss";

const UserLayout = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { i18n } = useTranslation();

    const items = useMemo(() => generateUserTabs(userId), [userId, i18n.language]);

    if (!userId) return <Navigate to={routes.root} />;

    return (
        <main className={styles.main}>
            <PageTabs items={items} />
        </main>
    );
};

export default UserLayout;
