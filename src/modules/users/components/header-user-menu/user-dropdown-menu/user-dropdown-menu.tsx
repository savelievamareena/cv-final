import { Link } from "react-router-dom";
import { Dropdown, Flex, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { ProfilePicture } from "../profile-picture";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { routes } from "@/router";
import { authService } from "@/services/auth-service";

import styles from "./user-dropdown-menu.module.scss";

interface UserDropdownMenuProps {
    userId?: string;
    profileLetter?: string;
    avatar?: string | null;
}

const UserDropdownMenu = ({ userId, profileLetter, avatar }: UserDropdownMenuProps) => {
    const { t } = useTranslation();

    const handleLogout = () => {
        authService.logout();
    };

    let userProfileUrl = "";

    if (userId) {
        userProfileUrl = routes.users.userById(userId);
    }

    const profileMenu: MenuProps["items"] = [
        {
            label: (
                <Link to={userProfileUrl}>
                    <Flex gap="1rem" className={classNames(styles.dropdownMenu)}>
                        <UserOutlined />
                        {t("Profile")}
                    </Flex>
                </Link>
            ),
            key: "1",
        },
        {
            label: (
                <Link to={routes.settings}>
                    <Flex gap="1rem" className={classNames(styles.dropdownMenu)}>
                        <SettingOutlined />
                        {t("Settings")}
                    </Flex>
                </Link>
            ),
            key: "2",
        },
        {
            type: "divider",
        },
        {
            label: (
                <Link to={routes.auth.root} onClick={handleLogout}>
                    <Flex gap="1rem" className={classNames(styles.dropdownMenu)}>
                        <LogoutOutlined />
                        {t("Logout")}
                    </Flex>
                </Link>
            ),
            key: "3",
        },
    ];

    return (
        <Dropdown
            menu={{
                items: profileMenu,
                selectable: false,
            }}
            placement={"bottom"}
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
        >
            <Flex justify="center" align="center" className={classNames(styles.avatarWrapper)}>
                <ProfilePicture profileLetter={profileLetter} avatar={avatar} />
            </Flex>
        </Dropdown>
    );
};

export default UserDropdownMenu;
