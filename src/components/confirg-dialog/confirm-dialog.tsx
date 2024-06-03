import { createDialogHook } from "@/helpers/dialog/create-dialog";
import BaseDialog from "../dialog/base-dialog";

interface ConfirmDialogProps {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDialog = ({ title, onConfirm, onClose }: ConfirmDialogProps) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return <BaseDialog title={title} onConfirm={handleConfirm} onClose={onClose} />;
};

export const useConfirm = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
