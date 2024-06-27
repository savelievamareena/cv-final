import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Dropdown, DropdownProps, Flex, MenuProps } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../header.module.scss";
import { Languages } from "@/i18n.ts";

const LanguagesSelect = () => {
    const { i18n, t } = useTranslation();
    const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
    const [language, setLanguage] = useState<Languages>(
        (i18n.resolvedLanguage as Languages) ?? Languages.En
    );

    const changeLanguage = (lang: Languages) => {
        void i18n.changeLanguage(lang);
    };

    const languages: MenuProps["items"] = [
        {
            label: <span className={classNames(styles.dropdownMenu)}>English</span>,
            key: Languages.En,
        },
        {
            label: <span className={classNames(styles.dropdownMenu)}>Русский</span>,
            key: Languages.Ru,
        },
    ];

    const handleOpenLangChange: DropdownProps["onOpenChange"] = (nextOpen) => {
        setIsLanguagesOpen(nextOpen);
    };

    const handleSelectLanguage: MenuProps["onClick"] = ({ key }) => {
        setLanguage(key as Languages);
        changeLanguage(key as Languages);
        setIsLanguagesOpen(false);
    };

    return (
        <Dropdown
            menu={{
                items: languages,
                selectable: true,
                defaultSelectedKeys: [language],
                onClick: handleSelectLanguage,
            }}
            onOpenChange={handleOpenLangChange}
            placement={"bottom"}
            trigger={["click"]}
        >
            <Flex gap="0.5rem" className={classNames(styles.pointer)}>
                <div>{language.toUpperCase()}</div>
                {isLanguagesOpen ? (
                    <CaretUpOutlined
                        aria-label={t("header.languageSelector.close")}
                        className={classNames(styles.headerIcons)}
                    />
                ) : (
                    <CaretDownOutlined
                        aria-label={t("header.languageSelector.open")}
                        className={classNames(styles.headerIcons)}
                    />
                )}
            </Flex>
        </Dropdown>
    );
};

export default LanguagesSelect;
