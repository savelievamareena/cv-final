import { notification } from "antd";
import { NotificationType } from "./notification.types";
import { PropsWithChildren, createContext } from "react";

const initialValue = {
    showNotification: (type: NotificationType, message: string, key?: string | number) => {
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

    const showNotification = (type: NotificationType, message: string, key?: string | number) => {
        api.open({
            type,
            message,
            key,
        });
    };

    const closeNotification = (key?: string | number) => {
        api.destroy(key);
    };

    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={{ showNotification, closeNotification }}>
                {children}
            </NotificationContext.Provider>
        </>
    );
};
