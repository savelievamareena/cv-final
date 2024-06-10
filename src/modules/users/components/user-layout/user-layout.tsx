import styles from "./user-layout.module.scss";
import { PageTabs, PageTabItem } from "@/components/page-tabs";
import { RouteParams, routes } from "@/router";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const UserLayout = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    if (!userId) return <></>;

    const items = useMemo(
        () =>
            [
                {
                    path: routes.users.profile(userId),
                    label: "Profile",
                },
                {
                    path: routes.users.skills(userId),
                    label: "Skills",
                },
                {
                    path: routes.users.cvs(userId),
                    label: "CVs",
                },
                {
                    path: routes.users.languages(userId),
                    label: "Languages",
                },
            ] as PageTabItem[],
        [userId]
    );

    return (
        <main className={styles.main}>
            <PageTabs items={items} />
        </main>
    );
};
