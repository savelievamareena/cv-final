import { useState } from "react";
import classNames from "classnames/bind";
import { Flex, Layout } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { Navigation } from "@/modules/header/components/navigation";
import { LanguagesSelect } from "./languages-select";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { getUserNameToDisplay } from "src/helpers/user/getUserNameToDisplay.ts";
import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";

const Header = () => {
    const cx = classNames.bind(styles);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const user = useAuthUser();

    return (
        <Layout.Header className={cx("header_wrapper")}>
            <MenuOutlined
                className={cx("header_icons", "red", "big")}
                onClick={() => setDrawerOpen(true)}
            />
            <Flex gap='4rem'>
                <Flex gap='small'>
                    <GlobalOutlined className={cx("header_icons", "grey", "big")} />

                    <LanguagesSelect />
                </Flex>
                <Flex gap='middle'>
                    <div>{getUserNameToDisplay(user)}</div>
                    <UserDropdownMenu
                        userId={user?.id}
                        profileLetter={getUserNameToDisplay(user)?.slice(0, 1).toUpperCase()}
                        avatar={user?.profile?.avatar}
                    />
                </Flex>
            </Flex>
            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
    );
};

export default Header;
