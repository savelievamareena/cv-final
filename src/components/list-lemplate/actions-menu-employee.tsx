import { MoreOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button } from "antd";
import { Content } from "antd/es/layout/layout";
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
            key: "0",
            label: (
                <Content key="update" onClick={onHandleUpdate}>
                    {t("details")}
                </Content>
            ) as ReactNode,
        },
    ];

    return (
        <Dropdown.Button menu={{ items }} trigger={["click"]}>
            <Button>
                <Space>
                    <MoreOutlined />
                </Space>
            </Button>
        </Dropdown.Button>
    );
};

export default memo(ActionsMenuEmployee);
