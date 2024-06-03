import { notification } from "antd";
import { NotificationType } from "./notification.types";

export const showNotification = (
    type: NotificationType,
    message: string,
    key?: string | number,
) => {
    notification.open({
        type,
        message,
        key,
    });
};

export const closeNotification = (key?: string | number) => {
    notification.destroy(key);
};
