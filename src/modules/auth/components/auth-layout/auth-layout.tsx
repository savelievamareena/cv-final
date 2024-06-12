import { Suspense } from "react";
import { Spin } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

import styles from "./auth-layout.module.scss";

export const AuthLayout = () => {
    const user = useAuthUser();

    const { t } = useTranslation();

    if (user?.is_verified) {
        return <Navigate to={routes.root} />;
    }

    return (
        <>
            <header className={styles.header}>
                <NavLink to={routes.auth.login}>{t("auth.login")}</NavLink>
                <NavLink to={routes.auth.signUp}>{t("auth.signup")}</NavLink>
                <NavLink to={routes.auth.verification}>{t("auth.verifyMail")}</NavLink>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<Spin size="large" />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
