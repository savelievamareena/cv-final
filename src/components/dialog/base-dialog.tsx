import { Button, Modal } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface dialogProps {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
    children?: ReactNode;
}

const BaseDialog = ({ title, onConfirm, onClose, children }: dialogProps) => {
    const { t } = useTranslation();
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
                <Button key='cancel' onClick={onClose}>
                    {t("cancel")}
                </Button>,
                <Button key='confirm' type='primary' onClick={handleConfirm}>
                    {t("confirm")}
                </Button>,
            ]}
        >
            {children}
        </Modal>
    );
};

export default BaseDialog;
