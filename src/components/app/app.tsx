import { Spin } from "antd";
import { Suspense } from "react";
import { ThemeProvider } from "@/antd";
import { AppAPIProvider } from "@/graphql";
import { NotificationContextProvider } from "@/helpers/notification";
import { AppRouterProvider } from "@/router";

export const App = () => {
    return (
        <AppAPIProvider>
            <ThemeProvider>
                <Suspense fallback={<Spin fullscreen size="large" />}>
                    <NotificationContextProvider>
                        <AppRouterProvider />
                    </NotificationContextProvider>
                </Suspense>
            </ThemeProvider>
        </AppAPIProvider>
    );
};
