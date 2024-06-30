import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SettingSelect } from "../setting-select";
import { themeService, ThemePreference, useUserThemePreference } from "@/services/theme-service";

const ThemeSelect = () => {
    const themePreference = useUserThemePreference();

    const { t } = useTranslation();

    const options = useMemo(
        () =>
            Object.values(ThemePreference).map((value) => ({
                label: t(`settings.themeSelect.options.${value}`),
                value,
            })),
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
