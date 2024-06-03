import BaseDialog from "@/components/dialog/base-dialog";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface ConfirmDialogProps {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDialog = ({ title, onConfirm, onClose }: ConfirmDialogProps) => {
    return (
        <BaseDialog title={title} onConfirm={onConfirm} onClose={onClose}>
            <p>123</p>
        </BaseDialog>
    );
};

export const useAddDepartment = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
