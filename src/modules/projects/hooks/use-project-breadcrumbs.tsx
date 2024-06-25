import { FolderOutlined, HomeOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useProjectQuery } from "../api";

import styles from "./use-project-breadcrumbs.module.scss";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { RouteParams, routes } from "@/router";

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
