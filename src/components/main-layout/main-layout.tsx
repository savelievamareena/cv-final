import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { Outlet } from "react-router-dom";
import { Header } from "@/modules/header";

export const MainLayout = () => {
    // TODO: Add redirect for unauthorised users

    return (
        <>
            <Header />
            <Outlet />
            <DialogsContainer />
        </>
    );
};
