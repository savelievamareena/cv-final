import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { FolderOutlined, HomeOutlined } from "@ant-design/icons";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";

import { useProjectQuery } from "../api";
import { RouteParams, routes } from "@/router";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";

import styles from "./use-project-breadcrumbs.module.scss";

export const useProjectBreadcrumbs = () => {
    const { t } = useTranslation();

    const { [RouteParams.ProjectId]: projectId } = useParams();

    const { data } = useProjectQuery({ projectId });

    const items = useMemo(() => {
        if (!projectId) return [];

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
            { title: t("Projects"), href: routes.projects.root },
            {
                title: (
                    <Flex
                        gap="small"
                        className={classNames(styles.projectName, styles.projectName_last)}
                    >
                        <FolderOutlined />
                        <span>{!!data ? data.project.name : projectId}</span>
                    </Flex>
                ),
            },
        ];

        return tabs;
    }, [projectId, data, t]);

    useBreadcrumbs(items);
};
