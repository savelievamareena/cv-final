import { useState } from "react";
import { Dropdown, DropdownProps, Flex, MenuProps } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Languages } from "@/i18n.ts";
import classNames from "classnames/bind";
import styles from "../header.module.css";

const LanguagesSelect = () => {
    const cx = classNames.bind(styles);
    const [isLanguagesOpen, setLanguagesOpen] = useState(false);
    const [language, setLanguage] = useState<Languages>(Languages.En);

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
        setLanguagesOpen(nextOpen);
    };

    const handleSelectLanguage: MenuProps["onClick"] = ({ key }) => {
        setLanguage(key as Languages);
        setLanguagesOpen(false);
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
            <Flex gap={10} className={cx("pointer")}>
                <div>{language}</div>
                {isLanguagesOpen ? (
                    <CaretUpOutlined className={cx("header_icons")} />
                ) : (
                    <CaretDownOutlined className={cx("header_icons")} />
                )}
            </Flex>
        </Dropdown>
    );
};

export default LanguagesSelect;
