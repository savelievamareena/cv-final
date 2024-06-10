import { ReactNode } from "react";
import { TabsProps } from "antd";

export interface PageTabItem {
    path: string;
    label: ReactNode;
}

export type PageTabsProps = Omit<TabsProps, "items" | "onChange" | "defaultActiveKey"> & {
    items: PageTabItem[];
};
