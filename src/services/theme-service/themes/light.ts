import { AppThemeConfig } from "./types";

export const lightTheme: AppThemeConfig = {
    name: "light",
    token: {
        colorBgBase: "#ffffff",
        colorPrimary: "#C63031",
        colorBgContainer: "#ffffff",
        colorTextBase: "#2e2e2e",
        colorLink: "#2e2e2e",
        colorIcon: "#2e2e2e",
        controlOutlineWidth: 0,
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
            colorPrimaryBg: "#C63031",
            colorPrimaryBgHover: "8A2122",
            primaryColor: "#ffffff",
            colorPrimaryHover: "#8A2122",
            defaultBg: "#ffffff",
            defaultColor: "#2e2e2e",
            defaultHoverColor: "#4e4e4e",
            defaultHoverBg: "#ffffff",
            defaultBorderColor: "#d2d2d2",
            defaultHoverBorderColor: "#2e2e2e",
            borderColorDisabled: "transparent",
            contentFontSize: 16,
            controlOutlineWidth: 0,
        },
        Spin: {
            colorPrimary: "#C63031",
        },
    },
};
