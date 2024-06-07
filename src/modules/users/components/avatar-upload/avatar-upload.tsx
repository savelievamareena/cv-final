import { fileToBase64 } from "@/helpers/file-to-base64";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps } from "antd";
import { useUploadAvatar } from "../../api";
import { User } from "cv-graphql";
import Dragger from "antd/es/upload/Dragger";
import { useNotificationContext } from "@/helpers/notification";
import { useTranslation } from "react-i18next";
import { MAX_AVATAR_SIZE } from "../../constants";

export const AvatarUpload = ({ user }: { user: User }) => {
    const [uploadAvatar, { loading }] = useUploadAvatar();
    const { t } = useTranslation();

    const { showNotification } = useNotificationContext();

    const handleUpload = (file: File) => {
        fileToBase64(file)
            .then((avatar) =>
                uploadAvatar({ variables: { avatar: { userId: user.id, ...avatar } } })
            )
            .catch((err) => {
                console.error(err);
            });
    };

    const props: UploadProps = {
        name: "file",
        multiple: false,
        disabled: loading,
        showUploadList: false,
        beforeUpload: (file) => {
            console.log(file);
            if (file.size > MAX_AVATAR_SIZE) {
                showNotification("error", t("profile.avatarUpload.errors.maxAvatarSize"));
                return false;
            }

            handleUpload(file);
            return false;
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t("profile.avatarUpload.text")}</p>
            <p className="ant-upload-hint">{t("profile.avatarUpload.hint")}</p>
        </Dragger>
    );
};
