import classNames from "classnames";
import { Drawer } from "antd";
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

interface NavigationTypes {
    isDrawerOpen: boolean;
    setDrawerOpen: (arg1: boolean) => void;
}

const Navigation = ({ isDrawerOpen, setDrawerOpen }: NavigationTypes) => {
    const onClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Drawer
            placement='left'
            closable={false}
            open={isDrawerOpen}
            width={250}
            styles={{
                header: { padding: "10px", backgroundColor: "#2E2E2E" },
                body: { padding: 0 },
            }}
        >
            <div className={styles.nav_header}>
                <CloseOutlined onClick={onClose} className={styles.close_icon} />
            </div>
            <div className={styles.drawerContent}>
                <div className={classNames(styles.menu_item, styles.border_bottom, styles.active)}>
                    <HomeFilled style={{ fontSize: "20px" }} /> Home
                </div>
                <div className={styles.menu_item}>
                    <UserOutlined style={{ fontSize: "20px" }} /> Employees
                </div>
                <div className={styles.menu_item}>
                    <FolderOutlined style={{ fontSize: "20px" }} /> Projects
                </div>
                <div className={classNames(styles.menu_item, styles.border_bottom)}>
                    <AuditOutlined style={{ fontSize: "20px" }} /> CVs
                </div>
                <div className={styles.menu_item}>
                    <ApartmentOutlined style={{ fontSize: "20px" }} /> Departments
                </div>
                <div className={styles.menu_item}>
                    <ContactsOutlined style={{ fontSize: "20px" }} /> Positions
                </div>
                <div className={styles.menu_item}>
                    <RiseOutlined style={{ fontSize: "20px" }} /> Skills
                </div>
                <div className={styles.menu_item}>
                    <GlobalOutlined style={{ fontSize: "20px" }} /> Languages
                </div>
            </div>
        </Drawer>
    );
};

export default Navigation;
