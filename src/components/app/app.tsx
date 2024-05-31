import { AppRouterProvider } from "@/router";
import { AppAPIProvider } from "@/graphql";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/antd";

export const App = () => {
    return (
        <AppAPIProvider>
            <ConfigProvider theme={antdTheme}>
                <AppRouterProvider></AppRouterProvider>
            </ConfigProvider>
        </AppAPIProvider>
    );
};
