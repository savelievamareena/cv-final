import { Flex, Spin } from "antd";

import { useAuthUser } from "@/services/auth-service";
import { useProfileQuery } from "../../api";

import styles from "./header-user-menu.module.scss";
import { UserDropdownMenu } from "./user-dropdown-menu";

const HeaderUserMenu = () => {
    const user = useAuthUser();

    const { data, loading } = useProfileQuery({ userId: user?.id });

    if (!user) return null;

    if (loading)
        return (
            <div className={styles.loaderWrapper}>
                <Spin />
            </div>
        );

    return (
        <Flex align="center">
            <span className={styles.userName}>
                {data?.profile.full_name ? data?.profile.full_name : user.email}
            </span>
            <UserDropdownMenu
                userId={user.id}
                profileLetter={data?.profile.full_name ? data?.profile.full_name[0] : user.email[0]}
                avatar={data?.profile.avatar}
            />
        </Flex>
    );
};

export default HeaderUserMenu;
