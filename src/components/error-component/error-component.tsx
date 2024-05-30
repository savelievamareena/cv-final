import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

export const ErrorComponent = () => {
    const error = useRouteError();

    useEffect(() => {
        console.error(error);
    }, []);

    return <div>Error</div>;
};
