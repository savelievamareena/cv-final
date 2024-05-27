import { useEffect, useState } from "react";
import { Image } from "antd";
import styles from "./profile-picture.module.css";

const ProfilePicture = () => {
    const [avatarLink, setAvatarLink] = useState("");

    useEffect(() => {
        // get and setAvatarLink avatar link for the current user
        setAvatarLink("");
    });

    return avatarLink !== "" ? (
        <Image width={40} src={avatarLink} />
    ) : (
        <div className={styles.profile_picture_filler}></div>
    );
};

export default ProfilePicture;
