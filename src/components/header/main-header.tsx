import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { Layout, Flex } from "antd";
import classNames from "classnames";
import { useState } from "react";

import { HeaderUserMenu } from "@/modules/users/components/header-user-menu";
import styles from "./header.module.scss";
import { LanguagesSelect } from "./languages-select";
import { MainNavigation } from "./navigation";

const MainHeader = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout.Header className={styles.fixedHeader}>
            <Flex className={styles.spreadFlex}>
                <MenuOutlined
                    className={classNames(styles.headerIcons, styles.red, styles.big)}
                    onClick={() => setDrawerOpen(true)}
                />
                <Flex gap="3rem">
                    <Flex gap="small">
                        <GlobalOutlined
                            className={classNames(styles.headerIcons, styles.grey, styles.big)}
                        />
                        <LanguagesSelect />
                    </Flex>
                    <Flex gap="small">
                        <HeaderUserMenu />
                    </Flex>
                </Flex>
            </Flex>
            <MainNavigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
    );
};

export default MainHeader;
