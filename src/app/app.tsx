import { AppRouterProvider } from "src/router";
import { AppAPIProvider } from "../api";

export const App = () => {
    return (
        <AppAPIProvider>
            <AppRouterProvider />
        </AppAPIProvider>
    );
};
