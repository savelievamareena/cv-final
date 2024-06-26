import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { memo } from "react";

import styles from "./bulk-delete-button.module.scss";
import { bulkDeleteService } from "@/services/bulk-delete-service";

interface BulkDeleteProps {
    item: string;
    isSelected: boolean;
}

const BulkDeleteButton = ({ item, isSelected }: BulkDeleteProps) => {
    const Icon = isSelected ? DeleteFilled : DeleteOutlined;

    return (
        <Button
            type="text"
            className={classNames(styles.button, { [styles.selected]: isSelected })}
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
