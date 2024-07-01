import { Spin } from "antd";

import styles from "./page-loader.module.scss";

const PageLoader = () => {
    return (
        <div className={styles.wrapper}>
            <Spin size="large" />
        </div>
    );
};

export default PageLoader;
