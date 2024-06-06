import { AppRouterProvider } from "@/router";
import { AppAPIProvider } from "@/graphql";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/antd";
import { NotificationContextProvider } from "@/helpers/notification";

export const App = () => {
    return (
        <AppAPIProvider>
            <ConfigProvider theme={antdTheme}>
                <NotificationContextProvider>
                    <AppRouterProvider />
                </NotificationContextProvider>
            </ConfigProvider>
        </AppAPIProvider>
    );
};
