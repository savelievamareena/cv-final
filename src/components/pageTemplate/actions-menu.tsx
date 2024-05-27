import { memo, ReactNode } from "react";
import { Space, Dropdown } from "antd";
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
            key: 0,
            label: (
                <div onClick={onUpdate}>
                    {t("update")} {pageName}
                </div>
            ) as ReactNode,
        },
        {
            key: 1,
            label: (
                <div onClick={onDelete}>
                    {t("delete")} {pageName}
                </div>
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
