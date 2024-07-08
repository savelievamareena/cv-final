import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { BreadcrumbsProvider } from "@/helpers/breadcrumbs";
import { DialogsContainer } from "@/helpers/dialog/dialog-container";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { FullsizeLoader } from "../fullsize-loader";
import { MainHeader } from "../header";
import styles from "./main-layout.module.scss";

const MainLayout = () => {
    const user = useAuthUser();

    if (!user?.is_verified) return <Navigate to={routes.auth.root} />;

    return (
        <>
            <MainHeader />
            <main className={styles.main}>
                <BreadcrumbsProvider>
                    <Suspense fallback={<FullsizeLoader />}>
                        <Outlet />
                    </Suspense>
                </BreadcrumbsProvider>
            </main>
            <DialogsContainer />
        </>
    );
};
export default MainLayout;
