import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
    token: {
        colorBgBase: "#3E3E3E",
        colorPrimary: "#C63031",
        colorBgContainer: "#3E3E3E",
        colorTextBase: "#ffffff",
        colorLink: "#ffffff",
        colorBgSpotlight: "#3E3E3E",
        colorBorder: "#A6A6A6",
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
            defaultBg: "#C63031",
            defaultColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: "#8A2122",
            contentFontSize: 16,
            controlOutlineWidth: 0,
            borderColorDisabled: "transparent",
        },
        Select: {
            optionSelectedBg: "#4E4E4E",
        },
    },
};
