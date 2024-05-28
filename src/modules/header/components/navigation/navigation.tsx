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
        <div
            className={classNames(
                styles.drawer_content,
                isDrawerOpen ? styles.menu_visible : styles.menu_hidden,
            )}
        >
            <Drawer
                title=''
                placement='left'
                closable={false}
                onClose={onClose}
                open={isDrawerOpen}
                key='right'
                width={250}
                styles={{
                    header: { padding: "10px", backgroundColor: "#2E2E2E" },
                    body: { padding: 0 },
                }}
            >
                <div className={styles.close_item}>
                    <CloseOutlined onClick={onClose} className={styles.close_icon} />
                </div>
                <div className={styles.drawerContent}>
                    <div className={classNames(styles.menu_item, styles.border_bottom)}>
                        <HomeFilled style={{ color: "#767676", fontSize: "18px" }} /> Home
                    </div>
                    <div className={styles.menu_item}>
                        <UserOutlined style={{ fontSize: "18px" }} /> Employees
                    </div>
                    <div className={styles.menu_item}>
                        <FolderOutlined style={{ fontSize: "18px" }} /> Projects
                    </div>
                    <div className={classNames(styles.menu_item, styles.border_bottom)}>
                        <AuditOutlined style={{ fontSize: "18px" }} /> CVs
                    </div>
                    <div className={styles.menu_item}>
                        <ApartmentOutlined style={{ fontSize: "18px" }} /> Departments
                    </div>
                    <div className={styles.menu_item}>
                        <ContactsOutlined style={{ fontSize: "18px" }} /> Positions
                    </div>
                    <div className={styles.menu_item}>
                        <RiseOutlined style={{ fontSize: "18px" }} /> Skills
                    </div>
                    <div className={styles.menu_item}>
                        <GlobalOutlined style={{ fontSize: "18px" }} /> Languages
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Navigation;
