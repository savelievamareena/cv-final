import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";

import styles from "./auth-layout.module.scss";
import { routes } from "@/router";
import { authService } from "@/services";
import { useReactiveVar } from "@apollo/client";

export const AuthLayout = () => {
    const location = useLocation();

    const user = useReactiveVar(authService.user);

    if (user) {
        const shouldRedirectToVerify =
            !user.is_verified && location.pathname !== routes.auth.verification;

        return shouldRedirectToVerify ? (
            <Navigate to={routes.auth.verification} />
        ) : (
            <Navigate to={routes.root} />
        );
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
