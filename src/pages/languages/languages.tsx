import { useTranslation } from "react-i18next";
import { LanguagesList } from "@/modules/languages/";
import { useGenericBreadcrumbs } from "@/hooks";

const LanguagesPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Languages"));

    return <LanguagesList />;
};

export default LanguagesPage;
