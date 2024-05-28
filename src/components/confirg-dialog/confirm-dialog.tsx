import { DialogProps } from "@/helpers/create-dialog";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps extends DialogProps {
    title: string;
    isOpen: boolean;
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

export default ConfirmDialog;
