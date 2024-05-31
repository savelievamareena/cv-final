import { useEffect, useState } from "react";
import { Avatar } from "antd";

const ProfilePicture = () => {
    const [avatarLink, setAvatarLink] = useState("");

    useEffect(() => {
        // get and setAvatarLink avatar link for the current user
        setAvatarLink("");
    }, []);

    return (
        <Avatar src={avatarLink} size='large'>
            U
        </Avatar>
    );
};

export default ProfilePicture;
