import { Spin } from "antd";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styles from "./auth-layout.module.scss";
import { AuthHeader } from "@/components/header";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

export const AuthLayout = () => {
    const user = useAuthUser();

    if (user?.is_verified) {
        return <Navigate to={routes.root} />;
    }

    return (
        <>
            <AuthHeader />
            <main className={styles.main}>
                <Suspense fallback={<Spin size="large" />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
