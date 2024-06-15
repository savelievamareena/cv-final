import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { RcFile } from "antd/es/upload";
import { User } from "cv-graphql";
import { useTranslation } from "react-i18next";
import { fileToBase64 } from "@/helpers/file-to-base64";
import { useAvatarUpload } from "../../api";
import { useNotificationContext } from "@/helpers/notification";
import { ALLOWED_IMAGE_TYPES, MAX_AVATAR_SIZE } from "../../constants";

const AvatarUpload = ({ user }: { user: User }) => {
    const [uploadAvatar, { loading }] = useAvatarUpload();
    const { t } = useTranslation();

    const { showNotification } = useNotificationContext();

    const handleFileUpload = (file: RcFile) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            showNotification("error", t("profile.avatarUpload.errors.invalidFileType"));
            return false;
        }
        if (file.size > MAX_AVATAR_SIZE) {
            showNotification("error", t("profile.avatarUpload.errors.maxAvatarSize"));
            return false;
        }

        fileToBase64(file)
            .then((avatar) =>
                uploadAvatar({ variables: { avatar: { userId: user.id, ...avatar } } })
            )
            .catch((err: unknown) => {
                showNotification(
                    "error",
                    err instanceof Error ? err.message : t("profile.avatarUpload.errors.generic")
                );
            });

        return false;
    };

    return (
        <Dragger
            name="file"
            multiple={false}
            disabled={loading}
            showUploadList={false}
            beforeUpload={handleFileUpload}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t("profile.avatarUpload.text")}</p>
            <p className="ant-upload-hint">{t("profile.avatarUpload.hint")}</p>
        </Dragger>
    );
};

export default AvatarUpload;
