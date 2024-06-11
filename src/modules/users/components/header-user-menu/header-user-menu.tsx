import { Spin } from "antd";
import { useAuthUser } from "@/services/auth-service";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { useProfileQuery } from "../../api";

const HeaderUserMenu = () => {
    const user = useAuthUser();

    if (!user) return null;

    const { data, loading } = useProfileQuery({ userId: user.id });

    if (loading) return <Spin />;

    return (
        <>
            <span>{data?.profile ? data?.profile.full_name : user.email}</span>
            <UserDropdownMenu
                userId={user.id}
                profileLetter={data?.profile.full_name ? data?.profile.full_name[0] : user.email[0]}
                avatar={data?.profile.avatar}
            />
        </>
    );
};

export default HeaderUserMenu;
