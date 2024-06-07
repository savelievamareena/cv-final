import { RouteParams, routes } from "@/router";
import { TabsProps, Tabs } from "antd";
import { useMemo } from "react";
import { useParams, useLocation, useNavigate, Outlet } from "react-router-dom";

export const UserTabs = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    if (!userId) return <></>;

    const items: TabsProps["items"] = useMemo(
        () => [
            {
                key: routes.users.profile(userId),
                label: "Profile",
                children: <Outlet />,
            },
            {
                key: routes.users.skills(userId),
                label: "Skills",
                children: <Outlet />,
            },
            {
                key: routes.users.cvs(userId),
                label: "CVs",
                children: <Outlet />,
            },
            {
                key: routes.users.languages(userId),
                label: "Languages",
                children: <Outlet />,
            },
        ],
        [userId]
    );

    const onChange = (key: string) => {
        navigate(key);
    };

    return <Tabs onChange={onChange} defaultActiveKey={location.pathname} items={items} />;
};
