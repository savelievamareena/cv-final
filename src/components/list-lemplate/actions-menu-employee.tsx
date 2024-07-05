import { MoreOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button } from "antd";
import { t } from "i18next";
import { memo, ReactNode } from "react";

export interface Action {
    onUpdate: (id: string) => void;
}

type ActionProps = Action & { pageName: string; record: { id: string } };

const ActionsMenuEmployee = ({ onUpdate, record }: ActionProps) => {
    const onHandleUpdate = () => {
        onUpdate(record.id);
    };

    const items = [
        {
            key: "update",
            label: (<span>{t("details")}</span>) as ReactNode,
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

export default memo(ActionsMenuEmployee);
