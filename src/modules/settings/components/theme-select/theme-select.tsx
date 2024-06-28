import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SettingSelect } from "../setting-select";
import { themeService } from "@/services/theme-service/theme-service";
import { ThemePreference } from "@/services/theme-service/theme-service.constants";
import { useUserThemePreference } from "@/services/theme-service/theme-service.hooks";

const ThemeSelect = () => {
    const themePreference = useUserThemePreference();

    const { t } = useTranslation();

    const options = useMemo(
        () => [
            { label: t("settings.themeSelect.options.default"), value: ThemePreference.Default },
            { label: t("settings.themeSelect.options.dark"), value: ThemePreference.Dark },
            { label: t("settings.themeSelect.options.light"), value: ThemePreference.Light },
        ],
        [t]
    );

    return (
        <SettingSelect
            label={t("settings.themeSelect.label")}
            value={themePreference ?? undefined}
            options={options}
            onChange={(pref: ThemePreference) => {
                themeService.updateTheme(pref);
            }}
        />
    );
};

export default ThemeSelect;
