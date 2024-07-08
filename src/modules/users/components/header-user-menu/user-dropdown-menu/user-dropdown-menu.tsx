import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { routes } from "@/router";
import { authService } from "@/services/auth-service";
import { ProfilePicture } from "../profile-picture";
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
        userProfileUrl = routes.users.profile(userId);
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
            <Flex justify="center" align="center" className={styles.avatarWrapper}>
                <Button type="text" className={styles.avatarWrapper}>
                    <ProfilePicture profileLetter={profileLetter} avatar={avatar} />
                </Button>
            </Flex>
        </Dropdown>
    );
};

export default UserDropdownMenu;
