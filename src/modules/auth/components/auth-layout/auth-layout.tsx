import { NavLink, Navigate, Outlet } from "react-router-dom";

import styles from "./auth-layout.module.scss";
import { routes } from "@/router";
import { authService } from "@/services";
import { useReactiveVar } from "@apollo/client";

export const AuthLayout = () => {
    const user = useReactiveVar(authService.user);

    if (user?.is_verified) {
        return <Navigate to={routes.root} />;
    }

    return (
        <>
            <header>
                <NavLink to={routes.auth.login}>Login</NavLink>
                <NavLink to={routes.auth.signUp}>Sign Up</NavLink>
                <NavLink to={routes.auth.verification}>Verify</NavLink>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
};
