import { ConfigProvider } from "antd";
import { antdTheme } from "@/antd";
import { AppAPIProvider } from "@/graphql";
import { NotificationContextProvider } from "@/helpers/notification";
import { AppRouterProvider } from "@/router";

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
