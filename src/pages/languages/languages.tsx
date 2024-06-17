import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useBreadcrumbs } from "@/helpers/breadcrumbs";
import { LanguagesList } from "@/modules/languages/";
import { routes } from "@/router";

const LanguagesPage = () => {
    const { t } = useTranslation();

    const items = useMemo(
        () => [{ title: t("Home"), href: routes.root }, { title: t("Languages") }],
        [t]
    );

    useBreadcrumbs(items);

    return <LanguagesList />;
};

export default LanguagesPage;
