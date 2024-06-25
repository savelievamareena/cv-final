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
import { Drawer, Flex } from "antd";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./navigation.module.scss";
import { routes } from "@/router/constants";

interface NavigationProps {
    isDrawerOpen: boolean;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MainNavigation = ({ isDrawerOpen, setDrawerOpen }: NavigationProps) => {
    const { t } = useTranslation();
    const onClose = () => {
        setDrawerOpen(false);
    };

    const location = useLocation();

    useEffect(() => {
        onClose();
    }, [location]);

    return (
        <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={isDrawerOpen}
            width={250}
            classNames={{
                header: styles.drawerHeader,
                body: styles.drawerBody,
            }}
        >
            <Flex justify={"flex-end"} align={"center"} className={classNames(styles.navHeader)}>
                <CloseOutlined onClick={onClose} className={classNames(styles.closeIcon)} />
            </Flex>
            <Flex vertical>
                <NavLink
                    to={routes.root}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem, styles.menuItem_borderBottom)}>
                        <HomeFilled className={classNames(styles.navIcon)} /> {t("Home")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.users.root}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <UserOutlined className={classNames(styles.navIcon)} /> {t("Employees")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.projects.root}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <FolderOutlined className={classNames(styles.navIcon)} /> {t("Projects")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.cvs.root}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem, styles.menuItem_borderBottom)}>
                        <AuditOutlined className={classNames(styles.navIcon)} /> {t("CVs")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.departments}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <ApartmentOutlined className={classNames(styles.navIcon)} />{" "}
                        {t("Departments")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.positions}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <ContactsOutlined className={classNames(styles.navIcon)} /> {t("Positions")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.skills}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <RiseOutlined className={classNames(styles.navIcon)} /> {t("Skills")}
                    </Flex>
                </NavLink>
                <NavLink
                    to={routes.languages}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    <Flex className={classNames(styles.menuItem)}>
                        <GlobalOutlined className={classNames(styles.navIcon)} /> {t("Languages")}
                    </Flex>
                </NavLink>
            </Flex>
        </Drawer>
    );
};

export default MainNavigation;
