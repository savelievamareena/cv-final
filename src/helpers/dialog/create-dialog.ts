import { dialogsService } from "@/services/dialog-service/dialog-servise";
import { FC, useCallback, useRef } from "react";
import { v4 } from "uuid";

export const createDialogHook =
    <T>(Component: FC<T>) =>
    () => {
        const idRef = useRef<string>();
        const closeDialog = useCallback(() => {
            console.log(dialogsService.dialogs());
            if (!idRef.current) return;

            dialogsService.closeDialog(idRef.current);
        }, []);

        const openDialog = useCallback(
            (props?: Omit<T, "onClose">) => {
                idRef.current = v4();

                dialogsService.openDialog(idRef.current, () =>
                    Component({ ...props, onClose: closeDialog } as T),
                );
            },
            [closeDialog],
        );

        return [openDialog, closeDialog];
    };
