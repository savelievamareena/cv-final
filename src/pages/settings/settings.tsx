import { useTranslation } from "react-i18next";

import { useGenericBreadcrumbs } from "@/hooks";
import { ThemeSelect } from "@/components/theme-select";
import { LangSelect } from "@/components/lang-select";

import styles from "./settings.module.scss";

const SettingsPage = () => {
    const { t } = useTranslation();

    useGenericBreadcrumbs(t("Settings"));

    return (
        <div className={styles.wrapper}>
            <ThemeSelect />
            <LangSelect />
        </div>
    );
};

export default SettingsPage;
