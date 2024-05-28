import classNames from "classnames";
import { Dropdown, Flex, Layout, MenuProps } from "antd";
import { ProfilePicture } from "./components/profile-picture";
import { useState } from "react";
import { Navigation } from "@/modules/header/components/navigation";
import {
    CaretDownOutlined,
    GlobalOutlined,
    MenuOutlined,
    CaretUpOutlined,
} from "@ant-design/icons";
import styles from "./header.module.css";

type LanguageType = "EN" | "DE" | "RU";

const Header = () => {
    const { Header: AntdHeader } = Layout;
    const [isLanguagesOpen, setLanguagesOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [language, setLanguage] = useState<LanguageType>("EN");

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        const langToSet = key as LanguageType;
        setLanguage(langToSet);
        setLanguagesOpen(false);
    };

    const handleLanguageToggle = () => {
        setLanguagesOpen((prevState) => !prevState);
    };

    const languages = [
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

    const menuProps: MenuProps = {
        items: languages,
        onClick: handleMenuClick,
    };

    return (
        <>
            <AntdHeader className={styles.header_wrapper}>
                <MenuOutlined
                    className={classNames(styles.header_icons, styles.red, styles.big)}
                    onClick={() => setDrawerOpen(true)}
                />
                <Flex gap={"large"} justify={"space-between"} style={{ width: "25%" }}>
                    <Flex gap={"small"}>
                        <GlobalOutlined
                            className={classNames(styles.header_icons, styles.grey, styles.big)}
                        />
                        <Dropdown menu={menuProps} trigger={["click"]} placement='bottom'>
                            <div
                                style={{ cursor: "pointer", display: "flex", gap: "8px" }}
                                onClick={handleLanguageToggle}
                            >
                                <div>{language}</div>
                                {isLanguagesOpen ? (
                                    <CaretUpOutlined
                                        className={classNames(
                                            styles.header_icons,
                                            styles.white,
                                            styles.small,
                                        )}
                                    />
                                ) : (
                                    <CaretDownOutlined
                                        className={classNames(
                                            styles.header_icons,
                                            styles.white,
                                            styles.small,
                                        )}
                                    />
                                )}
                            </div>
                        </Dropdown>
                    </Flex>
                    <Flex gap={"small"}>
                        {/*get current user*/}
                        <div>user.email@gmail.com</div>
                        <ProfilePicture />
                    </Flex>
                </Flex>
            </AntdHeader>

            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </>
    );
};

export default Header;
