import { Suspense } from "react";
import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { MainHeader } from "../header";

import styles from "./main-layout.module.scss";

export const MainLayout = () => {
    const user = useAuthUser();

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    return (
        <>
            <MainHeader />
            <main className={styles.main}>
                <div>Breadcrumb component</div>
                <Suspense fallback={<Spin size="large" fullscreen />}>
                    <Outlet />
                </Suspense>
            </main>
            <DialogsContainer />
        </>
    );
};
