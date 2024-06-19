import { ProfileContent } from "@/modules/users/components/profile-content";
import { useUserBreadcrumbs } from "@/modules/users/hooks";

const UserProfile = () => {
    useUserBreadcrumbs();

    return <ProfileContent />;
};

export default UserProfile;
