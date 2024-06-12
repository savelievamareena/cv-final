import { useState } from "react";
import classNames from "classnames/bind";
import { Flex, Layout } from "antd";
import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";

import { Navigation } from "@/modules/header/components/navigation";
import { LanguagesSelect } from "./languages-select";
import { HeaderUserMenu } from "../users/components/header-user-menu";

import styles from "./header.module.css";

const Header = () => {
    const cx = classNames.bind(styles);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout.Header className={cx("header_wrapper")}>
            <MenuOutlined
                className={cx("header_icons", "red", "big")}
                onClick={() => setDrawerOpen(true)}
            />
            <Flex gap="4rem">
                <Flex gap="small">
                    <GlobalOutlined className={cx("header_icons", "grey", "big")} />

                    <LanguagesSelect />
                </Flex>
                <Flex gap="middle">
                    <HeaderUserMenu />
                </Flex>
            </Flex>
            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
    );
};

export default Header;
