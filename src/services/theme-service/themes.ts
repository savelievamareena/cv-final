import { ThemeConfig } from "antd/es/config-provider/context";

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: "#C63031",
        colorBgContainer: "#ffffff",
        colorTextBase: "2e2e2e",
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
            contentFontSize: 16,
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
        },
    },
};

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: "#C63031",
        colorBgContainer: "#3E3E3E",
        colorTextBase: "ffffff",
    },
    components: {
        Layout: {
            bodyBg: "#3E3E3E",
            headerBg: "#2E2E2E",
            headerColor: "#ffffff",
            headerPadding: "0 10%",
        },
        Avatar: { containerSizeLG: 44 },
        Button: {
            contentFontSize: 16,
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
        },
    },
};
