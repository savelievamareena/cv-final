import { Avatar } from "antd";

interface ProfilePictureProps {
    profileLetter?: string;
    avatar?: string | null;
}

const ProfilePicture = ({ profileLetter, avatar }: ProfilePictureProps) => {
    return (
        <Avatar src={avatar} size="large">
            {avatar ? "" : profileLetter}
        </Avatar>
    );
};

export default ProfilePicture;
