import { MoreOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button } from "antd";
import { t } from "i18next";
import { memo } from "react";

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
            key: "update",
            label: (
                <span>
                    {t("update")} {pageName}
                </span>
            ),
        },
        {
            key: "delete",
            label: (
                <span>
                    {t("delete")} {pageName}
                </span>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                onSelect: ({ key }) => {
                    switch (key) {
                        case "update": {
                            onHandleUpdate();
                            return;
                        }
                        case "delete": {
                            onHandleDelete();
                        }
                    }
                },
            }}
            trigger={["click"]}
        >
            <Button type="text">
                <Space>
                    <MoreOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default memo(ActionsMenu);
