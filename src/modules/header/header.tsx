import classNames from "classnames";
import { Flex, Layout } from "antd";
import {
    CaretDownOutlined,
    GlobalOutlined,
    MenuOutlined,
    CaretUpOutlined,
} from "@ant-design/icons";
import styles from "./header.module.css";
import { ProfilePicture } from "./components/profile-picture";
import { useState } from "react";

const Header = () => {
    const { Header: AntdHeader } = Layout;
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <AntdHeader
                style={{
                    boxShadow: "0px 1px 10px 0px #2E2E2E",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <MenuOutlined className={classNames(styles.header_icons, styles.red, styles.big)} />
                <Flex gap={"large"} justify={"space-between"} style={{ width: "25%" }}>
                    <Flex gap={"small"}>
                        <GlobalOutlined
                            className={classNames(styles.header_icons, styles.grey, styles.big)}
                        />
                        <div>EN</div>
                        {isMenuOpen ? (
                            <CaretUpOutlined
                                className={classNames(
                                    styles.header_icons,
                                    styles.white,
                                    styles.small,
                                )}
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            />
                        ) : (
                            <CaretDownOutlined
                                className={classNames(
                                    styles.header_icons,
                                    styles.white,
                                    styles.small,
                                )}
                                onClick={() => {
                                    setMenuOpen(true);
                                }}
                            />
                        )}
                    </Flex>
                    <Flex gap={"small"}>
                        {/*get current user*/}
                        <div>user.email@gmail.com</div>
                        <ProfilePicture />
                    </Flex>
                </Flex>
            </AntdHeader>
        </>
    );
};

export default Header;
