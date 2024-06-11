import { Modal } from "antd";
import { ReactNode } from "react";

interface dialogProps {
    title: string;
    onClose: () => void;
    children?: ReactNode;
}

export const BaseDialog = ({ title, onClose, children }: dialogProps) => {
    return (
        <Modal open title={title} onCancel={onClose} footer={null}>
            {children}
        </Modal>
    );
};
