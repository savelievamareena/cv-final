import { PropsWithChildren, useEffect } from "react";
import { ConfigProvider } from "antd";
import { useAppTheme } from "@/services/theme-service/theme-service.hooks";

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme, isDark } = useAppTheme();

    useEffect(() => {
        console.log(isDark);
    }, [isDark]);

    return <ConfigProvider theme={theme ?? undefined}>{children}</ConfigProvider>;
};

export default ThemeProvider;
