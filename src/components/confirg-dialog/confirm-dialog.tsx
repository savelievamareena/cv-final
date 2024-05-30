import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({ title, isOpen, onConfirm, onCancel }: ConfirmDialogProps) => {
    const { t } = useTranslation("dialog");

    return (
        <Modal
            open={isOpen}
            title={title}
            onCancel={onCancel}
            footer={[
                <Button key='cancel' onClick={onCancel}>
                    {t("cancel")}
                </Button>,
                <Button key='confirm' type='primary' onClick={onConfirm}>
                    {t("confirm")}
                </Button>,
            ]}
        ></Modal>
    );
};

export const useConfirm = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
