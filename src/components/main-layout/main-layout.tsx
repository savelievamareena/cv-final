import { Suspense, useEffect } from "react";
import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { BreadcrumbsProvider } from "@/helpers/breadcrumbs";
import { MainHeader } from "../header";

import styles from "./main-layout.module.scss";
import { useAppTheme } from "@/services/theme-service/theme-service.hooks";

export const MainLayout = () => {
    const user = useAuthUser();

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    const { isDark } = useAppTheme();

    useEffect(() => {
        if (isDark) document.body.classList.add(styles.darkBody);
        return () => document.body.classList.remove(styles.darkBody);
    }, [isDark]);

    return (
        <>
            <MainHeader />
            <main className={styles.main}>
                <BreadcrumbsProvider>
                    <Suspense fallback={<Spin size="large" fullscreen />}>
                        <Outlet />
                    </Suspense>
                </BreadcrumbsProvider>
            </main>
            <DialogsContainer />
        </>
    );
};
