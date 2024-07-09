import { MenuOutlined } from "@ant-design/icons";
import { Layout, Flex, Button } from "antd";
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
                <Button type="text" onClick={() => setDrawerOpen(true)}>
                    <MenuOutlined
                        className={classNames(styles.headerIcons, styles.red, styles.big)}
                    />
                </Button>
                <Flex gap="5%" align="center">
                    <LanguagesSelect />
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
