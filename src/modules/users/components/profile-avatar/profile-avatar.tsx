import { Avatar } from "antd";
import { Profile, User } from "cv-graphql";
import { AvatarDeleteButton } from "../avatar-delete-button";

import styles from "./profile-avatar.module.scss";

interface ProfileAvatarProps {
    profile: Profile;
    user: User;
    canEdit: boolean;
}

const ProfileAvatar = ({ profile, user, canEdit }: ProfileAvatarProps) => {
    const userName = profile.first_name
        ? profile.first_name[0].toUpperCase()
        : user.email[0].toUpperCase();

    return (
        <div className={styles.avatarWrapper}>
            <Avatar className={styles.avatar} src={profile.avatar ?? undefined} alt="user-avatar">
                {!profile.avatar && userName}
            </Avatar>
            {canEdit && profile.avatar && (
                <AvatarDeleteButton className={styles.deleteButton} userId={user.id} />
            )}
        </div>
    );
};

export default ProfileAvatar;
