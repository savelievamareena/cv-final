import { Profile, User } from "cv-graphql";
import { Avatar } from "antd";
import { AvatarDeleteButton } from "../avatar-delete-button";

import styles from "./profile-avatar.module.scss";

export const ProfileAvatar = ({
    profile,
    user,
    canEdit,
}: {
    profile: Profile;
    user: User;
    canEdit: boolean;
}) => {
    return (
        <div className={styles.avatarWrapper}>
            <Avatar className={styles.avatar} src={profile.avatar ?? undefined} alt="user-avatar">
                {!profile.avatar && user.email[0].toUpperCase()}
            </Avatar>
            {canEdit && profile.avatar && (
                <AvatarDeleteButton className={styles.deleteButton} userId={user.id} />
            )}
        </div>
    );
};
