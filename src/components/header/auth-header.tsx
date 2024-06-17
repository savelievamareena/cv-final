import { Flex, Layout } from "antd";
import { AuthNavigation } from "./navigation";

import styles from "./header.module.scss";

const AuthHeader = () => {
    return (
        <Layout.Header className={styles.fixedHeader}>
            <Flex className={styles.centeredFlex}>
                <AuthNavigation />
            </Flex>
        </Layout.Header>
    );
};

export default AuthHeader;
