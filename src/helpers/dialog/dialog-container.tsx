import { Suspense } from "react";
import { useReactiveVar } from "@apollo/client";
import { dialogsService } from "./dialog-servise";

export const DialogsContainer = () => {
    const dialogs = useReactiveVar(dialogsService.dialogs);

    return (
        <Suspense>
            {dialogs.map(({ id, Component }) => (
                <Component key={id} />
            ))}
        </Suspense>
    );
};