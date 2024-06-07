import { TabsProps } from "antd";

export type TabItem = Omit<Required<TabsProps>["items"][0], "children">;

export type PageTabsProps = Omit<TabsProps, "items" | "onChange" | "defaultActiveKey"> & {
    items: TabItem[];
};
