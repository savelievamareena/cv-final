import { AppThemeConfig } from "./types";

export const darkTheme: AppThemeConfig = {
    name: "dark",
    token: {
        colorBgBase: "#4E4E4E",
        colorPrimary: "#C63031",
        colorBgContainer: "#4A4A4A",
        colorTextBase: "#ffffff",
        colorLink: "#ffffff",
        colorBgSpotlight: "#4A4A4A",
        colorBorder: "#A6A6A6",
        colorIcon: "#ffffff",
        controlOutlineWidth: 0,
    },
    components: {
        Layout: {
            bodyBg: "#4E4E4E",
            headerBg: "#2E2E2E",
            headerColor: "#ffffff",
            headerPadding: "0 10%",
        },
        Avatar: { containerSizeLG: 44 },
        Button: {
            colorPrimaryBg: "#C63031",
            colorPrimaryBgHover: "#8A2122",
            primaryColor: "#ffffff",
            colorPrimaryHover: "#8A2122",
            defaultBg: "#4e4e4e",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#3e3e3e",
            defaultBorderColor: "#a2a2a2",
            defaultHoverBorderColor: "#e2e2e2",
            borderColorDisabled: "transparent",
            contentFontSize: 16,
            controlOutlineWidth: 0,
        },
        Select: {
            optionSelectedBg: "#5E5E5E",
        },
        Spin: {
            colorPrimary: "#C63031",
            colorBgBase: "#C63031",
        },
    },
};
