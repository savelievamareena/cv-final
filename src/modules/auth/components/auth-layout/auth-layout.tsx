import { NavLink, Navigate, Outlet } from "react-router-dom";

import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

import styles from "./auth-layout.module.scss";

export const AuthLayout = () => {
    const user = useAuthUser();

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
