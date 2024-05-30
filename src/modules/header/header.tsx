import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Flex, Layout } from "antd";
import { Navigation } from "@/modules/header/components/navigation";
import { LanguagesSelect } from "./languages-select";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";

const Header = () => {
    const cx = classNames.bind(styles);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        //get logged in user email and profile pic
        setCurrentUser("user.email@gmail.com");
    }, []);

    return (
        <Layout.Header className={cx("header_wrapper")}>
            <MenuOutlined
                className={cx("header_icons", "red", "big")}
                onClick={() => setDrawerOpen(true)}
            />
            <Flex gap={80}>
                <Flex gap={"small"}>
                    <GlobalOutlined className={cx("header_icons", "grey", "big")} />

                    <LanguagesSelect />
                </Flex>
                <Flex gap={"middle"}>
                    <div>{currentUser}</div>
                    <UserDropdownMenu />
                </Flex>
            </Flex>
            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
    );
};

export default Header;
