import { useState } from "react";
import classNames from "classnames/bind";
import { Flex, Layout } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { Navigation } from "@/modules/header/components/navigation";
import { LanguagesSelect } from "./languages-select";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import { useHeaderProfile } from "./api";

const Header = () => {
    const cx = classNames.bind(styles);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const user = useAuthUser();

    const { data, loading } = useHeaderProfile({ userId: user!.id });

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
                    {!loading ? (
                        <>
                            <span>{data?.profile ? data?.profile.full_name : user!.email}</span>
                            <UserDropdownMenu
                                userId={user?.id}
                                profileLetter={
                                    data?.profile.full_name
                                        ? data?.profile.full_name[0]
                                        : user!.email[0]
                                }
                                avatar={data?.profile.avatar}
                            />
                        </>
                    ) : (
                        <span>Loading...</span>
                    )}
                </Flex>
            </Flex>
            <Navigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
    );
};

export default Header;
