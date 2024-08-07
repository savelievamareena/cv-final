import { useTranslation } from "react-i18next";

import { useGenericBreadcrumbs } from "@/hooks";
import { LangSelect } from "../lang-select";
import { ThemeSelect } from "../theme-select";

import styles from "./settings-content.module.scss";

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
