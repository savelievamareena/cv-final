import { Spin } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { useProfile } from "../../api";

const HeaderUserMenu = () => {
    const user = useAuthUser();

    if (!user) return <></>;

    const { data, loading } = useProfile({ userId: user.id });

    return !loading ? (
        <>
            <span>{data?.profile ? data?.profile.full_name : user.email}</span>
            <UserDropdownMenu
                userId={user.id}
                profileLetter={data?.profile.full_name ? data?.profile.full_name[0] : user.email[0]}
                avatar={data?.profile.avatar}
            />
        </>
    ) : (
        <Spin />
    );
};

export default HeaderUserMenu;
