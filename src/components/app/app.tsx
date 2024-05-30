import { AppRouterProvider } from "../../router";
import { AppAPIProvider } from "../../graphql";

export const App = () => {
    return (
        <AppAPIProvider>
            <AppRouterProvider />
        </AppAPIProvider>
    );
};
