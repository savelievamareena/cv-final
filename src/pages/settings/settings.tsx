import { useTranslation } from "react-i18next";

import { useGenericBreadcrumbs } from "@/hooks";
import { SettingsContent } from "@/modules/settings/components/settings-content";

const SettingsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Settings"));

    return <SettingsContent />;
};

export default SettingsPage;
