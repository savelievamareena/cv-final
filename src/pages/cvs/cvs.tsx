import { useTranslation } from "react-i18next";
import { useGenericBreadcrumbs } from "@/hooks";
import { CvsList } from "@/modules/cvs";

const CvsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("CVs"));

    return <CvsList />;
};

export default CvsPage;
