import { useMemo } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { routes } from "@/router";

export const useGenericBreadcrumbs = (finalPageTitle: string) => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [
            {
                title: (
                    <Flex gap="small">
                        <HomeOutlined />
                        <span>{t("Home")}</span>
                    </Flex>
                ),
                href: routes.root,
            },
            { title: finalPageTitle },
        ],
        [t]
    );

    useBreadcrumbs(items);
};
