import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageTabs } from "@/components/page-tabs";
import { generateCvTabs } from "@/modules/cvs/helpers/generate-cv-tabs";

const CV = () => {
    const { i18n } = useTranslation();
    const { cvId } = useParams<{ cvId: string }>();

    const items = useMemo(() => generateCvTabs(cvId), [cvId, i18n.language]);

    return <PageTabs items={items} />;
};

export default CV;
