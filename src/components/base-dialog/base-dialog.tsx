import { Modal, ModalProps } from "antd";
import { ReactNode } from "react";

interface DialogProps extends ModalProps {
    title: string;
    onClose: () => void;
    children?: ReactNode;
}

const BaseDialog = ({ title, onClose, children, ...props }: DialogProps) => {
    return (
        <Modal open title={title} onCancel={onClose} footer={null} {...props}>
            {children}
        </Modal>
    );
};
export default BaseDialog;
