import { HomeOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import classNames from "classnames";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { useCvById } from "@/modules/cvs/api";
import { RouteParams, routes } from "@/router";
import styles from "./use-cv-breadcrumbs.module.scss";

type TabType = "details" | "skills" | "projects" | "preview" | undefined;

export const useCvBreadcrumbs = (tab: TabType = "details") => {
    const { [RouteParams.CvId]: cvId } = useParams();
    const { t } = useTranslation();

    const { data: cvData } = useCvById(cvId!);

    const items = useMemo(() => {
        if (!cvId) return [];

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
            { title: t("CVs"), href: routes.cvs.root },
            {
                title: (
                    <Flex
                        gap="small"
                        className={classNames(styles.userName, {
                            [styles.userName_last]: tab === "details",
                        })}
                    >
                        <span>{cvData?.cv.name}</span>
                    </Flex>
                ),
                href: routes.cvs.details(cvId),
            },
        ];

        switch (tab) {
            case "skills": {
                tabs.push({ title: t("cv.tabLabels.skills") });
                break;
            }
            case "projects": {
                tabs.push({ title: t("cv.tabLabels.projects") });
                break;
            }
            case "preview": {
                tabs.push({ title: t("cv.tabLabels.preview") });
                break;
            }
        }

        return tabs;
    }, [tab, cvId, cvData, t]);

    useBreadcrumbs(items);
};
