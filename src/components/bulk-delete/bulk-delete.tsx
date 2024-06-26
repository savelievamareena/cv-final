import { Button, Flex, Layout } from "antd";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import styles from "./bulk-delete.module.scss";
import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";

interface BulkDeleteProps {
    onDelete(entityIds: string[]): Promise<unknown>;
}

const BulkDelete = ({ onDelete }: BulkDeleteProps) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const itemIds = useBulkDeleteItemIds();

    useEffect(() => {
        return () => {
            bulkDeleteService.reset();
        };
    }, []);

    const handleCancel = () => {
        bulkDeleteService.reset();
    };

    const handleDelete = () => {
        setIsLoading(true);
        void onDelete(itemIds).then(() => {
            setIsLoading(false);
            bulkDeleteService.reset();
        });
    };

    if (!itemIds.length) return null;

    return createPortal(
        <Layout.Footer className={styles.stickyFooter}>
            <Flex gap={"1rem"}>
                <Button
                    color="secondary"
                    disabled={isLoading}
                    type="default"
                    onClick={handleCancel}
                >
                    {t("cancel")}
                </Button>
                <Button type="primary" disabled={isLoading} onClick={handleDelete}>
                    <Flex gap="small" align="center">
                        <span>{t("delete")}</span>
                        <span className={styles.counter}>{itemIds.length}</span>
                    </Flex>
                </Button>
            </Flex>
        </Layout.Footer>,
        document.body
    );
};

export default memo(BulkDelete);
