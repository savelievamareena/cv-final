import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { FullsizeLoader } from "@/components/fullsize-loader";
import { AuthHeader } from "@/components/header";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import styles from "./auth-layout.module.scss";

const AuthLayout = () => {
    const user = useAuthUser();

    if (user?.is_verified) {
        return <Navigate to={routes.root} />;
    }

    return (
        <>
            <AuthHeader />
            <main className={styles.main}>
                <Suspense fallback={<FullsizeLoader />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
export default AuthLayout;
