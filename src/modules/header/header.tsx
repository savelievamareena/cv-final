import { useState } from "react";
import classNames from "classnames";
import { Flex, Layout } from "antd";
import { Navigation } from "@/modules/header/components/navigation";
import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import { DropdownLanguages } from "./dropdown-languages";
import { DropdownUser } from "./dropdown-user";
import styles from "./header.module.css";

const Header = () => {
    const { Header: AntdHeader } = Layout;
    const [isDrawerOpen, setDrawerOpen] = useState(false);

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

                        <DropdownLanguages />
                    </Flex>
                    <Flex gap={"small"}>
                        {/*get current user*/}
                        <div>user.email@gmail.com</div>
                        <DropdownUser />
                    </Flex>
                </Flex>
            </AntdHeader>

            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </>
    );
};

export default Header;
