import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { Drawer, Flex } from "antd";
import { routes } from "@/router/constants";
import {
    ApartmentOutlined,
    AuditOutlined,
    CloseOutlined,
    ContactsOutlined,
    FolderOutlined,
    GlobalOutlined,
    HomeFilled,
    RiseOutlined,
    UserOutlined,
} from "@ant-design/icons";
import styles from "./navigation.module.css";
import { useEffect } from "react";

interface NavigationProps {
    isDrawerOpen: boolean;
    setDrawerOpen: (arg1: boolean) => void;
}

const Navigation = ({ isDrawerOpen, setDrawerOpen }: NavigationProps) => {
    const cx = classNames.bind(styles);
    const onClose = () => {
        setDrawerOpen(false);
    };

    const location = useLocation();

    useEffect(() => {
        onClose();
    }, [location]);

    return (
        <Drawer
            placement='left'
            closable={false}
            onClose={onClose}
            open={isDrawerOpen}
            width={250}
            styles={{
                header: { padding: "10px", backgroundColor: "#2E2E2E" },
                body: { padding: 0 },
            }}
        >
            <Flex justify={"flex-end"} align={"center"} className={cx("nav_header")}>
                <CloseOutlined onClick={onClose} className={cx("close_icon")} />
            </Flex>
            <Flex vertical>
                <NavLink to={routes.root} className={({ isActive }) => cx({ active: isActive })}>
                    <Flex className={cx("menu_item", "border_bottom")}>
                        <HomeFilled className={cx("nav_icon")} /> Home
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.users.root}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item")}>
                        <UserOutlined className={cx("nav_icon")} /> Employees
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.projects.root}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item")}>
                        <FolderOutlined className={cx("nav_icon")} /> Projects
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.cvs.root}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item", "border_bottom")}>
                        <AuditOutlined className={cx("nav_icon")} /> CVs
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.departments}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item")}>
                        <ApartmentOutlined className={cx("nav_icon")} /> Departments
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.positions}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item")}>
                        <ContactsOutlined className={cx("nav_icon")} /> Positions
                    </Flex>
                </NavLink>
                <NavLink to={routes.skills} className={({ isActive }) => cx({ active: isActive })}>
                    <Flex className={cx("menu_item")}>
                        <RiseOutlined className={cx("nav_icon")} /> Skills
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.languages}
                    className={({ isActive }) => cx({ active: isActive })}
                >
                    <Flex className={cx("menu_item")}>
                        <GlobalOutlined className={cx("nav_icon")} /> Languages
                    </Flex>
                </NavLink>
            </Flex>
        </Drawer>
    );
};

export default Navigation;
