import { useState } from "react";
import { Dropdown, DropdownProps, MenuProps } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "../header.module.css";

type LanguageType = "EN" | "DE" | "RU";

const DropdownLanguages = () => {
    const [isLanguagesOpen, setLanguagesOpen] = useState(false);
    const [language, setLanguage] = useState<LanguageType>("EN");

    const languages: MenuProps["items"] = [
        {
            label: <span style={{ padding: "12px", fontSize: "18px" }}>English</span>,
            key: "EN",
        },
        {
            label: <span style={{ padding: "12px", fontSize: "18px" }}>Deutsch</span>,
            key: "DE",
        },
        {
            label: <span style={{ padding: "12px", fontSize: "18px" }}>Русский</span>,
            key: "RU",
        },
    ];

    const handleOpenLangChange: DropdownProps["onOpenChange"] = (nextOpen) => {
        setLanguagesOpen(nextOpen);
    };

    const handleSelectLanguage: MenuProps["onClick"] = ({ key }) => {
        setLanguage(key as LanguageType);
        setLanguagesOpen(false);
    };

    const langMenuProps: MenuProps = {
        items: languages,
        selectable: true,
        defaultSelectedKeys: [language],
        onClick: handleSelectLanguage,
    };

    return (
        <Dropdown
            menu={langMenuProps}
            onOpenChange={handleOpenLangChange}
            placement={"bottom"}
            trigger={["click"]}
        >
            <div
                style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "8px",
                }}
            >
                <div>{language}</div>
                {isLanguagesOpen ? (
                    <CaretUpOutlined
                        className={classNames(styles.header_icons, styles.white, styles.small)}
                    />
                ) : (
                    <CaretDownOutlined
                        className={classNames(styles.header_icons, styles.white, styles.small)}
                    />
                )}
            </div>
        </Dropdown>
    );
};

export default DropdownLanguages;
