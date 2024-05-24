import { createBrowserRouter } from "react-router-dom";
import PageTamplate from "src/components/pageTemplate/PageTemplate";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageTamplate />,
    },
]);
