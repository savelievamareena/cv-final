import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SettingSelect } from "../setting-select";
import { themeService } from "@/services/theme-service/theme-service";
import { useAppThemePref } from "@/services/theme-service/theme-service.hooks";
import { ThemePrefVariant } from "@/services/theme-service/theme-service.types";

const ThemeSelect = () => {
    const pref = useAppThemePref();

    const { t } = useTranslation();

    const options = useMemo(
        () => [
            { label: t("settings.themeSelect.options.default"), value: "default" },
            { label: t("settings.themeSelect.options.dark"), value: "dark" },
            { label: t("settings.themeSelect.options.light"), value: "light" },
        ],
        [t]
    );

    return (
        <SettingSelect
            label={t("settings.themeSelect.label")}
            value={pref ?? undefined}
            options={options}
            onChange={(pref: ThemePrefVariant) => {
                themeService.updateTheme(pref);
            }}
        />
    );
};

export default ThemeSelect;
