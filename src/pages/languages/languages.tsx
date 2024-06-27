import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import { LanguagesList } from "@/modules/languages/";

const LanguagesPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Languages"));

    return <LanguagesList />;
};

export default LanguagesPage;
