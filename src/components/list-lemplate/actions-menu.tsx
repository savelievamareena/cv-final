import { memo, ReactNode } from "react";
import { Space, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { t } from "i18next";

export interface Action {
    onUpdate: () => void;
    onDelete: () => void;
}

type ActionProps = Action & { pageName: string };

const ActionsMenu = ({ onUpdate, onDelete, pageName }: ActionProps) => {
    const items = [
        {
            key: "0",
            label: (
                <Menu.Item key='update' onClick={onUpdate}>
                    {t("update")} {pageName}
                </Menu.Item>
            ) as ReactNode,
        },
        {
            key: "1",
            label: (
                <Menu.Item key='delete' onClick={onDelete}>
                    {t("delete")} {pageName}
                </Menu.Item>
            ) as ReactNode,
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <MoreOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};

export default memo(ActionsMenu);
