import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDialog = ({ title, onConfirm, onClose }: ConfirmDialogProps) => {
    const { t } = useTranslation("dialog");
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            open={true}
            title={title}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {t("cancel")}
                </Button>,
                <Button key="confirm" type="primary" onClick={handleConfirm}>
                    {t("confirm")}
                </Button>,
            ]}
        ></Modal>
    );
};

export const useConfirm = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
