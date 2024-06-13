import { ProfilePicture } from "../profile-picture";
import { Link } from "react-router-dom";
import { Dropdown, Flex, MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { routes } from "@/router";
import classNames from "classnames/bind";
import styles from "@/modules/header/header.module.css";
import { authService } from "@/services/auth-service";
import { useTranslation } from "react-i18next";

interface UserDropdownMenuProps {
    userId?: string;
    profileLetter?: string;
    avatar?: string | null;
}

const UserDropdownMenu = ({ userId, profileLetter, avatar }: UserDropdownMenuProps) => {
    const cx = classNames.bind(styles);
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
                    <Flex gap="1rem" className={cx("dropdown_menu")}>
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
                    <Flex gap="1rem" className={cx("dropdown_menu")}>
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
                    <Flex gap="1rem" className={cx("dropdown_menu")}>
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
            <Flex className={cx("user_pic")}>
                <ProfilePicture profileLetter={profileLetter} avatar={avatar} />
            </Flex>
        </Dropdown>
    );
};

export default UserDropdownMenu;
