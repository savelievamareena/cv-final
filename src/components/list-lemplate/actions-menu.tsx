import { memo, ReactNode } from "react";
import { Space, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { t } from "i18next";

export interface Action {
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

type ActionProps = Action & { pageName: string; record: { id: string } };

const ActionsMenu = ({ onUpdate, onDelete, pageName, record }: ActionProps) => {
    const onHandleDelete = () => {
        onDelete(record.id);
    };
    const onHandlUpdate = () => {
        onUpdate(record.id);
    };

    const items = [
        {
            key: "0",
            label: (
                <div key='update' onClick={onHandlUpdate}>
                    {t("update")} {pageName}
                </div>
            ) as ReactNode,
        },
        {
            key: "1",
            label: (
                <div key='delete' onClick={onHandleDelete}>
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
