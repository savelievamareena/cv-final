import { PropsWithChildren, createContext, useCallback, useMemo } from "react";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

const initialValue = {
    showNotification: (type: IconType, message: string, key?: string | number) => {
        console.log({
            type,
            message,
            key,
        });
    },
    closeNotification: (key?: string | number) => {
        console.log(key);
    },
};

export const NotificationContext = createContext(initialValue);

export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
    const [api, contextHolder] = notification.useNotification({
        bottom: 50,
        duration: 2,
        maxCount: 3,
        placement: "bottomRight",
    });

    const showNotification = useCallback(
        (type: IconType, message: string, key?: string | number) => {
            api.open({
                type,
                message,
                key: key ?? message,
            });
        },
        [api]
    );

    const closeNotification = useCallback(
        (key?: string | number) => {
            api.destroy(key);
        },
        [api]
    );

    const contextValue = useMemo(
        () => ({ showNotification, closeNotification }),
        [showNotification, closeNotification]
    );

    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={contextValue}>
                {children}
            </NotificationContext.Provider>
        </>
    );
};
