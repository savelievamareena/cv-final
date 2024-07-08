import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useConfirm } from "@/components/confirm-dialog";
import { useAvatarDelete } from "@/modules/users/api/delete-avatar-mutation";

import styles from "./avatar-delete-button.module.scss";

const AvatarDeleteButton = ({ userId, className }: { userId: string; className: string }) => {
    const [deleteAvatar, { loading }] = useAvatarDelete();

    const { t } = useTranslation();

    const [openConfirm] = useConfirm();

    const handleDelete = () => {
        openConfirm({
            title: t("deleteConfirmation"),
            onConfirm: () => void void deleteAvatar({ variables: { avatar: { userId } } }),
        });
    };

    return (
        <Button
            type="text"
            className={classNames(styles.button, className)}
            disabled={loading}
            onClick={handleDelete}
        >
            <DeleteFilled />
        </Button>
    );
};

export default AvatarDeleteButton;
