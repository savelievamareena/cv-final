import { Flex } from "antd";
import styles from "../preview.module.scss";
import { FullsizeLoader } from "@/components/fullsize-loader";
import { useUserQuery } from "@/modules/users/api";

interface UserInfoBlockProps {
    userId: string;
}

const UserInfoBlock = ({ userId }: UserInfoBlockProps) => {
    const { data: userData, loading: userLoading } = useUserQuery({
        userId,
    });

    if (userLoading) return <FullsizeLoader />;

    return (
        <Flex vertical>
            <div className={styles.preview_name}>{userData?.user.profile.full_name}</div>
            <span>{userData?.user.position?.name.toUpperCase()}</span>
        </Flex>
    );
};

export default UserInfoBlock;
