import { Avatar } from "antd";

import styles from "./profile-picture.module.scss";

interface ProfilePictureProps {
    profileLetter?: string;
    avatar?: string | null;
}

const ProfilePicture = ({ profileLetter, avatar }: ProfilePictureProps) => {
    return (
        <Avatar className={styles.avatar} src={avatar} size="large">
            {avatar ? "" : profileLetter}
        </Avatar>
    );
};

export default ProfilePicture;
