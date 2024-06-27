import { TabsProps } from "antd";
import { ReactNode } from "react";

export interface PageTabItem {
    path: string;
    label: ReactNode;
}

export type PageTabsProps = Omit<
    TabsProps,
    "items" | "onChange" | "defaultActiveKey" | "activeKey"
> & {
    items: PageTabItem[];
};
