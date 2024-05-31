import classNames from "classnames/bind";
import { Drawer, Flex } from "antd";
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
import { Link } from "react-router-dom";

interface NavigationProps {
    isDrawerOpen: boolean;
    setDrawerOpen: (arg1: boolean) => void;
}

const Navigation = ({ isDrawerOpen, setDrawerOpen }: NavigationProps) => {
    const cx = classNames.bind(styles);
    const onClose = () => {
        setDrawerOpen(false);
    };

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
                <Link to='/'>
                    <Flex className={cx("menu_item", "border_bottom")}>
                        <HomeFilled className={cx("nav_icon")} /> Home
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item", "active")}>
                        <UserOutlined className={cx("nav_icon")} /> Employees
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item")}>
                        <FolderOutlined className={cx("nav_icon")} /> Projects
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item", "border_bottom")}>
                        <AuditOutlined className={cx("nav_icon")} /> CVs
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item")}>
                        <ApartmentOutlined className={cx("nav_icon")} /> Departments
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item")}>
                        <ContactsOutlined className={cx("nav_icon")} /> Positions
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item")}>
                        <RiseOutlined className={cx("nav_icon")} /> Skills
                    </Flex>
                </Link>
                <Link to='/'>
                    <Flex className={cx("menu_item")}>
                        <GlobalOutlined className={cx("nav_icon")} /> Languages
                    </Flex>
                </Link>
            </Flex>
        </Drawer>
    );
};

export default Navigation;
