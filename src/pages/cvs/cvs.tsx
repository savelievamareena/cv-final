import { useTranslation } from "react-i18next";
import { CvsList } from "@/modules/CVVSs";
import { useGenericBreadcrumbs } from "@/hooks";

const CvsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("CVs"));

    return <CvsList />;
};

export default CvsPage;
