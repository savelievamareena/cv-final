import { Router } from "src/router";
import { AppAPIProvider } from "../../graphql";

export const App = () => {
    return (
        <AppAPIProvider>
            <Router />
        </AppAPIProvider>
    );
};
