import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { RouteParams, routes } from "@/router";
import { useProfileQuery } from "../api";

import styles from "./use-user-breadcrumbs.module.scss";

type TabType = "profile" | "cvs" | "languages" | "skills" | undefined;

export const useUserBreadcrumbs = (tab: TabType = "profile") => {
    const { t } = useTranslation();

    const { [RouteParams.UserId]: userId } = useParams();

    const { data } = useProfileQuery({ userId });

    const items = useMemo(() => {
        if (!userId) return [];

        const tabs: BreadcrumbItemType[] = [
            {
                title: (
                    <Flex gap="small">
                        <HomeOutlined />
                        <span>{t("Home")}</span>
                    </Flex>
                ),
                href: routes.root,
            },
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
