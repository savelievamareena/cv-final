import { memo, ReactNode } from "react";
import { Space, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export interface Action {
    title: string;
    onClick: () => void;
}

export interface ActionsMenuProps {
    actionProps: Action[];
}

const ActionsMenu = ({ actionProps }: ActionsMenuProps) => {
    const items = actionProps.map((item, index) => ({
        key: index.toString(),
        label: (<div onClick={item.onClick}>{item.title}</div>) as ReactNode,
    }));

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
