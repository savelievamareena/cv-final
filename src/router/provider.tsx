import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};
