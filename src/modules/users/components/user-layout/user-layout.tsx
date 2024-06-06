import { Outlet } from "react-router-dom";
import { NavPanel } from "../nav-panel";

import styles from "./user-layout.module.scss";

export const UserLayout = () => {
    return (
        <main className={styles.main}>
            <NavPanel />
            <Outlet />
        </main>
    );
};
