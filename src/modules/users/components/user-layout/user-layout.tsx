import styles from "./user-layout.module.scss";
import { UserTabs } from "../user-tabs/user-tabs";

export const UserLayout = () => {
    return (
        <main className={styles.main}>
            <UserTabs />
        </main>
    );
};
