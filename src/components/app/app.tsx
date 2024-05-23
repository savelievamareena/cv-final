import { AppRouterProvider } from "src/router";
import { AppAPIProvider } from "../../graphql";

export const App = () => {
    return (
        <AppAPIProvider>
            <AppRouterProvider />
        </AppAPIProvider>
    );
};
