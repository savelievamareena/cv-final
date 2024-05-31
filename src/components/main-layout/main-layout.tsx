import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { Header } from "@/modules/header";

export const MainLayout = () => {
    const user = useAuthUser();

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    return (
        <>
            <Header />
            <Outlet />
            <DialogsContainer />
        </>
    );
};
