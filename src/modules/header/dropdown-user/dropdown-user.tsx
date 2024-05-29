import { ProfilePicture } from "../components/profile-picture";
import { Dropdown, MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

const DropdownUser = () => {
    const profileMenu: MenuProps["items"] = [
        {
            label: (
                <span style={{ padding: "12px 24px", fontSize: "18px" }}>
                    <UserOutlined style={{ paddingRight: "15px" }} />
                    Profile
                </span>
            ),
            key: "1",
        },
        {
            label: (
                <span style={{ padding: "12px 24px", fontSize: "18px" }}>
                    <SettingOutlined style={{ paddingRight: "15px" }} />
                    Settings
                </span>
            ),
            key: "2",
        },
        {
            type: "divider",
        },
        {
            label: (
                <span style={{ padding: "12px 24px", fontSize: "18px" }}>
                    <LogoutOutlined style={{ paddingRight: "15px" }} />
                    Logout
                </span>
            ),
            key: "3",
        },
    ];

    const profileMenuProps: MenuProps = {
        items: profileMenu,
        selectable: false,
    };

    return (
        <Dropdown
            menu={profileMenuProps}
            placement={"bottom"}
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
        >
            <div
                style={{
                    cursor: "pointer",
                    display: "flex",
                }}
            >
                <ProfilePicture />
            </div>
        </Dropdown>
    );
};

export default DropdownUser;
