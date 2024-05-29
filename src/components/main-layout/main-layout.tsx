import { routes } from "@/router";
import { authService } from "@/services";
import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";

export const MainLayout = () => {
    const user = useReactiveVar(authService.user);

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    return (
        <>
            <header>Header</header>
            <main>
                <Outlet />
            </main>
        </>
    );
};
