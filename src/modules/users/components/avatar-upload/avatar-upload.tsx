import { fileToBase64 } from "@/helpers/file-to-base64";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps } from "antd";
import { useUploadAvatar } from "../../api";
import { User } from "cv-graphql";
import Dragger from "antd/es/upload/Dragger";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const AvatarUpload = ({ user }: { user: User }) => {
    const [uploadAvatar, { loading }] = useUploadAvatar();

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
        beforeUpload: (file) => {
            if (file.size > MAX_FILE_SIZE) {
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
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data
                or other banned files.
            </p>
        </Dragger>
    );
};
