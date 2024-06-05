import { Button, Modal } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface dialogProps {
    title: string;
    onConfirm?: () => void;
    onClose: () => void;
    children?: ReactNode;
}

const BaseDialog = ({ title, onConfirm, onClose, children }: dialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }

        onClose();
    };

    const renderFooter = () => {
        return onConfirm
            ? [
                  <Button key='cancel' onClick={onClose}>
                      {t("cancel")}
                  </Button>,
                  <Button key='confirm' type='primary' htmlType='submit' onClick={handleConfirm}>
                      {t("confirm")}
                  </Button>,
              ]
            : null;
    };

    return (
        <Modal open={true} title={title} onCancel={onClose} footer={renderFooter()}>
            {children}
        </Modal>
    );
};

export default BaseDialog;
