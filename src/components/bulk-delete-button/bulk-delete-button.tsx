import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import { memo } from "react";

import styles from "./bulk-delete-button.module.scss";
import { bulkDeleteService } from "@/services/bulk-delete-service";

interface BulkDeleteProps extends ButtonProps {
    item: string;
    isSelected: boolean;
}

const BulkDeleteButton = ({ item, isSelected, className, ...props }: BulkDeleteProps) => {
    const Icon = isSelected ? DeleteFilled : DeleteOutlined;

    return (
        <Button
            {...props}
            type="text"
            className={classNames(styles.button, className, { [styles.selected]: isSelected })}
            onClick={(ev) => {
                ev.stopPropagation();
                bulkDeleteService.handleItemId(item);
            }}
        >
            <Icon className={styles.icon} />
        </Button>
    );
};

export default memo(BulkDeleteButton);
