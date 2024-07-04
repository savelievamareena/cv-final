import { Spin } from "antd";

import styles from "./fullsize-loader.module.scss";

const FullsizeLoader = () => {
    return (
        <div className={styles.wrapper}>
            <Spin size="large" />
        </div>
    );
};

export default FullsizeLoader;
