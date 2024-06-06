import classNames from "classnames";
import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useDeleteAvatar } from "../../api";

import styles from "./avatar-delete-button.module.scss";

export const AvatarDeleteButton = ({
    userId,
    className,
}: {
    userId: string;
    className: string;
}) => {
    const [deleteAvatar, { loading }] = useDeleteAvatar();

    return (
        <Button
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
