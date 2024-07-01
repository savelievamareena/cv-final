import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { MainHeader } from "../header";
import { PageLoader } from "../page-loader";
import styles from "./main-layout.module.scss";
import { BreadcrumbsProvider } from "@/helpers/breadcrumbs";
import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

export const MainLayout = () => {
    const user = useAuthUser();

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    return (
        <>
            <MainHeader />
            <main className={styles.main}>
                <BreadcrumbsProvider>
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
                </BreadcrumbsProvider>
            </main>
            <DialogsContainer />
        </>
    );
};
