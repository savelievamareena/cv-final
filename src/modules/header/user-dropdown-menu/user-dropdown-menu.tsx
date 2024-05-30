import { ProfilePicture } from "../components/profile-picture";
import { Link } from "react-router-dom";
import { Dropdown, Flex, MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "@/modules/header/header.module.css";

const UserDropdownMenu = () => {
    const cx = classNames.bind(styles);
    const profileMenu: MenuProps["items"] = [
        {
            label: (
                <Link to='/'>
                    <Flex gap={15} className={cx("dropdown_menu")}>
                        <UserOutlined />
                        Profile
                    </Flex>
                </Link>
            ),
            key: "1",
        },
        {
            label: (
                <Link to='/'>
                    <Flex gap={15} className={cx("dropdown_menu")}>
                        <SettingOutlined />
                        Settings
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
                <Link to='/'>
                    <Flex gap={15} className={cx("dropdown_menu")}>
                        <LogoutOutlined />
                        Logout
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
                <ProfilePicture />
            </Flex>
        </Dropdown>
    );
};

export default UserDropdownMenu;
