import { Modal } from "antd";
import { ReactNode } from "react";

interface dialogProps {
    title: string;
    onClose: () => void;
    children?: ReactNode;
}

const BaseDialog = ({ title, onClose, children }: dialogProps) => {
    return (
        <Modal open={true} title={title} onCancel={onClose}>
            {children}
        </Modal>
    );
};

export default BaseDialog;
