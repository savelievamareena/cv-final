import { Button, Flex, Layout } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { bulkDeleteService, useBulkDeleteItemIds } from "@/services/bulk-delete-service";
import { useConfirm } from "../confirm-dialog";
import styles from "./bulk-delete-footer.module.scss";

interface BulkDeleteProps {
    onDelete(entityIds: string[]): Promise<unknown>;
    loadingState: boolean;
}

const BulkDeleteFooter = ({ onDelete, loadingState }: BulkDeleteProps) => {
    const { t } = useTranslation();
    const itemIds = useBulkDeleteItemIds();

    const [openConfirm] = useConfirm();

    useEffect(() => {
        return () => {
            bulkDeleteService.reset();
        };
    }, []);

    if (!itemIds.length) return null;

    const handleCancel = () => {
        bulkDeleteService.reset();
    };

    const handleDelete = () => {
        openConfirm({
            title: t("deleteConfirmBulk", { num: itemIds.length }),
            onConfirm: () => {
                void onDelete(itemIds).then(() => {
                    bulkDeleteService.reset();
                });
            },
        });
    };

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
