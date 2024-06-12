import { useCallback, useMemo } from "react";
import { Tabs } from "antd";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { PageTabsProps } from "./page-tabs.types";

export const PageTabs = ({ items, ...props }: PageTabsProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const actualItems = useMemo(
        () => items.map(({ label, path }) => ({ label, key: path, children: <Outlet /> })),
        [items]
    );

    const onChange = useCallback(
        (key: string) => {
            navigate(key);
        },
        [navigate]
    );

    return (
        <Tabs
            {...props}
            onChange={onChange}
            defaultActiveKey={location.pathname}
            items={actualItems}
        />
    );
};