import styles from "./user-layout.module.scss";
import { PageTabs, TabItem } from "@/components/page-tabs";
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
                    key: routes.users.profile(userId),
                    label: "Profile",
                },
                {
                    key: routes.users.skills(userId),
                    label: "Skills",
                },
                {
                    key: routes.users.cvs(userId),
                    label: "CVs",
                },
                {
                    key: routes.users.languages(userId),
                    label: "Languages",
                },
            ] as TabItem[],
        [userId]
    );

    return (
        <main className={styles.main}>
            <PageTabs items={items} />
        </main>
    );
};
