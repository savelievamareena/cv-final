import { useTranslation } from "react-i18next";

import { LangSelect } from "../lang-select";
import { ThemeSelect } from "../theme-select";

import styles from "./settings-content.module.scss";
import { useGenericBreadcrumbs } from "@/hooks";

const SettingsContent = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Settings"));

    return (
        <div className={styles.wrapper}>
            <ThemeSelect />
            <LangSelect />
        </div>
    );
};

export default SettingsContent;
