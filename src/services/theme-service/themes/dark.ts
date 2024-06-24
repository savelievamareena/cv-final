import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
    token: {
        colorBgBase: "#4E4E4E",
        colorPrimary: "#C63031",
        colorBgContainer: "#4A4A4A",
        colorTextBase: "#ffffff",
        colorLink: "#ffffff",
        colorBgSpotlight: "#4A4A4A",
        colorBorder: "#A6A6A6",
        colorIcon: "#ffffff",
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
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
            contentFontSize: 16,
            controlOutlineWidth: 0,
            borderColorDisabled: "transparent",
        },
        Select: {
            optionSelectedBg: "#5E5E5E",
        },
    },
};
