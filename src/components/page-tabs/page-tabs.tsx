import { Tabs } from "antd";
import { Suspense, useCallback, useMemo } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { FullsizeLoader } from "../fullsize-loader";
import { PageTabsProps } from "./page-tabs.types";

export const PageTabs = ({ items, ...props }: PageTabsProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const actualItems = useMemo(
        () =>
            items.map(({ label, path }) => ({
                label,
                key: path,
                children: (
                    <Suspense fallback={<FullsizeLoader />}>
                        <Outlet />
                    </Suspense>
                ),
            })),
        [items]
    );

    const onChange = useCallback(
        (key: string) => {
            navigate(key);
        },
        [navigate]
    );

    const currActiveKey = useMemo(
        () =>
            actualItems.some((item) => item.key === location.pathname)
                ? location.pathname
                : actualItems[0]?.key,
        [actualItems, location.pathname]
    );

    return <Tabs {...props} onChange={onChange} activeKey={currActiveKey} items={actualItems} />;
};
