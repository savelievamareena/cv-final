import { useContext } from "react";
import { NotificationContext } from "./notification.context";

export const useNotificationContext = () => useContext(NotificationContext);
