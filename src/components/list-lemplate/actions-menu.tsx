import { MoreOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { t } from "i18next";
import { memo, ReactNode } from "react";

export interface Action {
    onUpdate: (id: string, name?: string) => void;
    onDelete: (id: string) => void;
}

type ActionProps = Action & { pageName: string; record: { id: string; name: string } };

const ActionsMenu = ({ onUpdate, onDelete, pageName, record }: ActionProps) => {
    const onHandleDelete = () => {
        onDelete(record.id);
    };
    const onHandleUpdate = () => {
        onUpdate(record.id, record.name);
    };

    const items = [
        {
            key: "0",
            label: (
                <Content key="update" onClick={onHandleUpdate}>
                    {t("update")} {pageName}
                </Content>
            ) as ReactNode,
        },
        {
            key: "1",
            label: (
                <Content key="delete" onClick={onHandleDelete}>
                    {t("delete")} {pageName}
                </Content>
            ) as ReactNode,
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>
                <Space>
                    <MoreOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default memo(ActionsMenu);
