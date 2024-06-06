import { useParams } from "react-router-dom";
import { RouteParams } from "@/router";
import { useProfile, useUser } from "../../api";

import { ProfileForm } from "../profile-form/profile-form";
import { AvatarUpload } from "../avatar-upload";
import { ProfileAvatar } from "../profile-avatar";
import { useAuthUser } from "@/services/auth-service";
import { UserRole } from "cv-graphql";

export const ProfileContent = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { loading: loadingProfile, data: profileData } = useProfile({ userId: userId! });
    const { loading: loadingUser, data: userData } = useUser({ userId: userId! });

    const loading = loadingProfile || loadingUser;

    const hasData = !!profileData?.profile && !!userData?.user;

    const currUser = useAuthUser();

    const canEdit = currUser?.role === UserRole.Admin || currUser?.id === userId;

    return (
        <>
            {loading && !hasData && <div>Loading</div>}
            {hasData && (
                <>
                    <ProfileAvatar
                        canEdit={canEdit}
                        user={userData.user}
                        profile={profileData.profile}
                    />
                    <p>
                        <span>{userData.user.email}</span>
                        {userData.user.is_verified && <span>✔️</span>}
                    </p>
                    {hasData && canEdit && <AvatarUpload user={userData.user} />}
                    {hasData && (
                        <ProfileForm
                            canEdit={canEdit}
                            user={userData.user}
                            profile={profileData.profile}
                        />
                    )}
                </>
            )}
        </>
    );
};
