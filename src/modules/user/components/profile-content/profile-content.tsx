import { useParams } from "react-router-dom";
import { Avatar } from "antd";
import { RouteParams } from "@/router";
import { useProfile, useUser } from "../../api";

import styles from "./profile-content.module.scss";
import { ProfileForm } from "../profile-form/profile-form";

export const ProfileContent = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { loading: loadingProfile, data: profileData } = useProfile({ userId: userId! });
    const { loading: loadingUser, data: userData } = useUser({ userId: userId! });

    const loading = loadingProfile || loadingUser;

    const hasData = !!profileData && !!userData;

    return (
        <>
            {loading && !hasData && <div>Loading</div>}
            {hasData && (
                <>
                    <Avatar
                        className={styles.avatar}
                        src={profileData.profile.avatar ?? undefined}
                        alt='user-avatar'
                    >
                        {!profileData.profile.avatar && userData.user.email[0].toUpperCase()}
                    </Avatar>
                    <p>
                        <span>{userData.user.email}</span>
                        {userData.user.is_verified && <span>✔️</span>}
                    </p>
                    {hasData && <ProfileForm user={userData.user} profile={profileData.profile} />}
                </>
            )}
        </>
    );
};
