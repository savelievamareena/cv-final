import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    // TODO: Add redirect for unauthorised users

    return (
        <>
            <header>Header</header>
            <Outlet />
        </>
    );
};
