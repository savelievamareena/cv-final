import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SettingSelect } from "../setting-select";
import { Languages } from "@/i18n";

const LangSelect = () => {
    const { t, i18n } = useTranslation();

    const options = useMemo(
        () => [
            { label: t("languageSelect.options.english"), value: Languages.En },
            { label: t("languageSelect.options.russian"), value: Languages.Ru },
        ],
        [t]
    );

    return (
        <SettingSelect
            label={t("settings.languageSelect.label")}
            value={i18n.language}
            options={options}
            onChange={(lang: Languages) => {
                void i18n.changeLanguage(lang);
            }}
        />
    );
};

export default LangSelect;
