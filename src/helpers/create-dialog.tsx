import { useState, ReactElement } from "react";

export interface DialogProps {
    onConfirm: () => void;
    onCancel?: () => void;
}

interface UseDialogProps<P extends DialogProps> {
    dialog: (props: P & { isOpen: boolean }) => ReactElement;
    dialogProps: Omit<P, "isOpen">;
}

const useDialog = <P extends DialogProps>({ dialog, dialogProps }: UseDialogProps<P>) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const handleConfirm = () => {
        closeDialog();
        dialogProps.onConfirm();
    };

    const handleCancel = () => {
        closeDialog();
        dialogProps.onCancel ? dialogProps.onCancel() : null;
    };

    const DialogComponent = dialog({
        ...dialogProps,
        isOpen,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
    } as P & { isOpen: boolean });

    return { openDialog, DialogComponent };
};

export default useDialog;
