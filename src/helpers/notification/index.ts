import { notification } from "antd";

notification.config({
    bottom: 50,
    duration: 2,
    maxCount: 3,
    placement: "bottomRight",
});

export * from "./notification.helpers";
