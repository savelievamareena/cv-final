import { ThemeConfig } from "antd/es/config-provider/context";

const baseTheme = {
    token: {},
    components: {
        Layout: {
            headerPadding: "0 10%",
        },
        Avatar: { containerSizeLG: 44 },
        Button: {
            contentFontSize: 16,
        },
    },
};

export const lightTheme: ThemeConfig = {
    ...baseTheme,
    token: {
        colorBgBase: "#ffffff",
        colorPrimary: "#C63031",
        colorBgContainer: "#ffffff",
        colorTextBase: "#2e2e2e",
    },
    components: {
        Layout: {
            bodyBg: "#ffffff",
            headerBg: "#2E2E2E",
            headerColor: "#ffffff",
        },
        Button: {
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
        },
    },
};

export const darkTheme: ThemeConfig = {
    ...baseTheme,
    token: {
        colorBgBase: "#3E3E3E",
        colorPrimary: "#C63031",
        colorBgContainer: "#3E3E3E",
        colorTextBase: "#ffffff",
    },
    components: {
        Layout: {
            bodyBg: "#3E3E3E",
            headerBg: "#2E2E2E",
            headerColor: "#ffffff",
        },
        Button: {
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
        },
    },
};
