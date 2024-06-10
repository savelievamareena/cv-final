import { Profile, User } from "cv-graphql";
import { Avatar } from "antd";
import { AvatarDeleteButton } from "../avatar-delete-button";

import styles from "./profile-avatar.module.scss";

const ProfileAvatar = ({
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
                {!profile.avatar &&
                    (profile.first_name
                        ? profile.first_name[0].toUpperCase()
                        : user.email[0].toUpperCase())}
            </Avatar>
            {canEdit && profile.avatar && (
                <AvatarDeleteButton className={styles.deleteButton} userId={user.id} />
            )}
        </div>
    );
};

export default ProfileAvatar;
