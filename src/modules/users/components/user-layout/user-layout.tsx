import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { PageTabs, PageTabItem } from "@/components/page-tabs";
import { RouteParams, routes } from "@/router";

import styles from "./user-layout.module.scss";

const UserLayout = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { t } = useTranslation();

    if (!userId) return <></>;

    const items = useMemo(
        () =>
            [
                {
                    path: routes.users.profile(userId),
                    label: t("user.tabLabels.profile"),
                },
                {
                    path: routes.users.skills(userId),
                    label: t("user.tabLabels.skills"),
                },
                {
                    path: routes.users.languages(userId),
                    label: t("user.tabLabels.languages"),
                },
                {
                    path: routes.users.cvs(userId),
                    label: t("user.tabLabels.cvs"),
                },
            ] as PageTabItem[],
        [userId, t]
    );

    return (
        <main className={styles.main}>
            <PageTabs items={items} />
        </main>
    );
};

export default UserLayout;
