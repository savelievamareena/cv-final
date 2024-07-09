import { CaretDownOutlined, CaretUpOutlined, GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "@/i18n.ts";
import styles from "../header.module.scss";

const LanguagesSelect = () => {
    const { i18n, t } = useTranslation();
    const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);

    const changeLanguage = (lang: Languages) => {
        void i18n.changeLanguage(lang);
    };

    const languages: MenuProps["items"] = [
        {
            label: (
                <span className={classNames(styles.dropdownMenu)}>
                    {t("languageSelect.options.english")}
                </span>
            ),
            key: Languages.En,
        },
        {
            label: (
                <span className={classNames(styles.dropdownMenu)}>
                    {t("languageSelect.options.russian")}
                </span>
            ),
            key: Languages.Ru,
        },
    ];

    const handleSelectLanguage: MenuProps["onSelect"] = ({ key }) => {
        changeLanguage(key as Languages);
    };

    return (
        <Dropdown
            menu={{
                items: languages,
                selectable: true,
                onSelect: handleSelectLanguage,
                selectedKeys: [i18n.language],
            }}
            open={isLanguagesOpen}
            onOpenChange={(open) => {
                setIsLanguagesOpen(open);
            }}
            placement={"bottom"}
            trigger={["click"]}
        >
            <Button type="text" className={classNames(styles.white, styles.hiddenSmall)}>
                <Flex gap={"small"}>
                    <GlobalOutlined
                        className={classNames(styles.headerIcons, styles.grey, styles.big)}
                    />
                    <span className={styles.white}>{i18n.language.toUpperCase()}</span>
                    {isLanguagesOpen ? (
                        <CaretUpOutlined
                            aria-label={t("header.languageSelector.close")}
                            className={classNames(styles.headerIcons)}
                        />
                    ) : (
                        <CaretDownOutlined
                            aria-label={t("header.languageSelector.open")}
                            className={classNames(styles.headerIcons, styles.white)}
                        />
                    )}
                </Flex>
            </Button>
        </Dropdown>
    );
};

export default LanguagesSelect;
