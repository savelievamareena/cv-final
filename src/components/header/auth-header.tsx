import { Flex, Layout } from "antd";
import styles from "./header.module.scss";
import { AuthNavigation } from "./navigation";

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
