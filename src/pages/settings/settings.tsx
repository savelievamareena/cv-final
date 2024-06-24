import { useTranslation } from "react-i18next";

import { useGenericBreadcrumbs } from "@/hooks";
import ThemeSelect from "@/components/theme-select/theme-select";

const SettingsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Settings"));

    return (
        <div>
            <ThemeSelect />
        </div>
    );
};

export default SettingsPage;
