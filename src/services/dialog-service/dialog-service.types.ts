import { ReactiveVar } from "@apollo/client";
import { FC } from "react";

export interface IDialog {
    id: string;
    Component: FC;
}

export interface IDialogService {
    dialogs: ReactiveVar<IDialog[]>;
    openDialog: (id: string, Component: FC) => void;
    closeDialog: (id: string) => void;
}
