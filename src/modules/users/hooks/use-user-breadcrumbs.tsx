import { RouteParams, routes } from "@/router";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "../api";
import { UserOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";

import styles from "./use-user-breadcrumbs.module.scss";

type TabType = "profile" | "cvs" | "languages" | "skills";

export const useUserBreadcrumbs = (tab: TabType = "profile") => {
    const { t } = useTranslation();
    console.log("");

    const { [RouteParams.UserId]: userId } = useParams();

    const { data } = useProfileQuery({ userId });

    const items = useMemo(() => {
        if (!userId) return [];

        const tabs: BreadcrumbItemType[] = [
            { title: t("Home"), href: routes.root },
            { title: t("Employees"), href: routes.users.root },
            {
                title: (
                    <Flex
                        gap="small"
                        className={classNames(styles.userName, {
                            [styles.userName_last]: tab === "profile",
                        })}
                    >
                        <UserOutlined />
                        <span>{!!data ? data.profile.full_name : userId}</span>
                    </Flex>
                ),
                href: routes.users.profile(userId),
            },
        ];

        switch (tab) {
            case "cvs": {
                tabs.push({ title: t("user.tabLabels.cvs") });
                break;
            }
            case "languages": {
                tabs.push({ title: t("user.tabLabels.languages") });
                break;
            }
            case "skills": {
                tabs.push({ title: t("user.tabLabels.skills") });
                break;
            }
        }

        return tabs;
    }, [tab, userId, data, t]);

    useBreadcrumbs(items);
};
