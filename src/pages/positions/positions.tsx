import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { PositionsList } from "@/modules/positions";
import { routes } from "@/router";

const PositionsPage = () => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [{ title: t("Home"), href: routes.root }, { title: t("Positions") }],
        [t]
    );

    useBreadcrumbs(items);

    return <PositionsList />;
};

export default PositionsPage;
