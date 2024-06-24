import { ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
    token: {
        colorBgBase: "#ffffff",
        colorPrimary: "#C63031",
        colorBgContainer: "#ffffff",
        colorTextBase: "#2e2e2e",
        colorLink: "#2e2e2e",
    },
    components: {
        Layout: {
            bodyBg: "#ffffff",
            headerBg: "#2E2E2E",
            headerColor: "#ffffff",
            headerPadding: "0 10%",
        },
        Avatar: { containerSizeLG: 44 },
        Button: {
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
            contentFontSize: 16,
            controlOutlineWidth: 0,
        },
    },
};
