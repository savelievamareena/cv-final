import { ThemeProvider } from "@/antd";
import { AppAPIProvider } from "@/graphql";
import { NotificationContextProvider } from "@/helpers/notification";
import { AppRouterProvider } from "@/router";

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
