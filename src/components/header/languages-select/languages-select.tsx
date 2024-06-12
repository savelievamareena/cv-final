import { useState } from "react";
import { Dropdown, DropdownProps, Flex, MenuProps } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Languages } from "@/i18n.ts";
import classNames from "classnames/bind";
import styles from "../header.module.scss";

const LanguagesSelect = () => {
    const cx = classNames.bind(styles);
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
            label: <span className={cx("dropdown_menu")}>English</span>,
            key: Languages.En,
        },
        {
            label: <span className={cx("dropdown_menu")}>Русский</span>,
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
            <Flex gap="0.5rem" className={cx("pointer")}>
                <div>{language.toUpperCase()}</div>
                {isLanguagesOpen ? (
                    <CaretUpOutlined
                        aria-label={t("header.languageSelector.close")}
                        className={cx("header_icons")}
                    />
                ) : (
                    <CaretDownOutlined
                        aria-label={t("header.languageSelector.open")}
                        className={cx("header_icons")}
                    />
                )}
            </Flex>
        </Dropdown>
    );
};

export default LanguagesSelect;
