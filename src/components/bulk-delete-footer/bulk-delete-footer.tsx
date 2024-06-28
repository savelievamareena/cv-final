import { Button, Flex, Layout } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./bulk-delete-footer.module.scss";
import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";

interface BulkDeleteProps {
    onDelete(entityIds: string[]): Promise<unknown>;
    loadingState: boolean;
}

const BulkDeleteFooter = ({ onDelete, loadingState }: BulkDeleteProps) => {
    const { t } = useTranslation();
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
        void onDelete(itemIds).then(() => {
            bulkDeleteService.reset();
        });
    };

    if (!itemIds.length) return null;

    return (
        <Layout.Footer className={styles.stickyFooter}>
            <Flex gap={"1rem"}>
                <Button
                    color="secondary"
                    disabled={loadingState}
                    type="default"
                    onClick={handleCancel}
                >
                    {t("cancel")}
                </Button>
                <Button type="primary" disabled={loadingState} onClick={handleDelete}>
                    <Flex gap="small" align="center">
                        <span>{t("delete")}</span>
                        <span className={styles.counter}>{itemIds.length}</span>
                    </Flex>
                </Button>
            </Flex>
        </Layout.Footer>
    );
};

export default BulkDeleteFooter;
