import { useParams } from "react-router-dom";
import { Avatar } from "antd";
import { RouteParams } from "@/router";
import { useProfile } from "../../api";

import styles from "./profile-content.module.scss";

export const ProfileContent = () => {
    const { [RouteParams.UserId]: userId } = useParams();

    const { loading, data } = useProfile({ userId: userId! });

    return (
        <>
            {loading && !data && <div>Loading</div>}
            {data && (
                <>
                    <Avatar
                        className={styles.avatar}
                        src={data.user.profile.avatar ?? undefined}
                        alt='user-avatar'
                    >
                        {!data.user.profile.avatar && data.user.email[0].toUpperCase()}
                    </Avatar>
                    <p>
                        <span>{data.user.email}</span>
                        {data.user.is_verified && <span>✔️</span>}
                    </p>
                </>
            )}
        </>
    );
};
