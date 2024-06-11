import { FC } from "react";
import { ReactiveVar } from "@apollo/client";

export interface IDialog {
    id: string;
    Component: FC;
}

export interface IDialogService {
    dialogs: ReactiveVar<IDialog[]>;
    openDialog: (id: string, Component: FC) => void;
    closeDialog: (id: string) => void;
}
