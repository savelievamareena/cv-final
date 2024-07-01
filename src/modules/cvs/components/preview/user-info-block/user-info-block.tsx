import { Flex, Spin, Typography } from "antd";
import styles from "../preview.module.scss";
import { useUserQuery } from "@/modules/users/api";

interface UserInfoBlockProps {
    userId: string;
}

const { Text } = Typography;

const UserInfoBlock = ({ userId }: UserInfoBlockProps) => {
    const { data: userData, loading: userLoading } = useUserQuery({
        userId,
    });

    if (userLoading) return <Spin size={"large"} />;

    return (
        <Flex vertical>
            <div className={styles.preview_name}>{userData?.user.profile.full_name}</div>
            <Text type={"secondary"}>{userData?.user.position?.name.toUpperCase()}</Text>
        </Flex>
    );
};

export default UserInfoBlock;
