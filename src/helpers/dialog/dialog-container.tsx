import { useReactiveVar } from "@apollo/client";
import { Suspense } from "react";
import { dialogsService } from "@/services/dialog-service";

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
