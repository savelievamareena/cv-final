import { AppRouterProvider } from "@/router";
import { AppAPIProvider } from "@/graphql";
import { NotificationContextProvider } from "@/helpers/notification";
import { ThemeProvider } from "@/antd";

export const App = () => {
    return (
        <AppAPIProvider>
            <ThemeProvider>
                <NotificationContextProvider>
                    <AppRouterProvider />
                </NotificationContextProvider>
            </ThemeProvider>
        </AppAPIProvider>
    );
};
