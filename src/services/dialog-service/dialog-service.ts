import { makeVar } from "@apollo/client";
import { IDialog, IDialogService } from "./dialog-service.types";

export const dialogsService: IDialogService = {
    dialogs: makeVar<IDialog[]>([]),
    openDialog(id, Component) {
        this.dialogs([...this.dialogs(), { id, Component }]);
    },
    closeDialog(id) {
        this.dialogs(this.dialogs().filter((dialog) => dialog.id !== id));
    },
};
