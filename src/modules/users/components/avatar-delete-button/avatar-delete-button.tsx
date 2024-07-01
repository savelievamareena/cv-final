import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { useAvatarDelete } from "../../api";

import styles from "./avatar-delete-button.module.scss";

const AvatarDeleteButton = ({ userId, className }: { userId: string; className: string }) => {
    const [deleteAvatar, { loading }] = useAvatarDelete();

    return (
        <Button
            type="text"
            className={classNames(styles.button, className)}
            disabled={loading}
            onClick={() => {
                void deleteAvatar({ variables: { avatar: { userId } } });
            }}
        >
            <DeleteFilled />
        </Button>
    );
};

export default AvatarDeleteButton;
