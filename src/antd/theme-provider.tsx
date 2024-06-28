import { ConfigProvider } from "antd";
import { PropsWithChildren, useEffect } from "react";
import styles from "./theme-provider.module.scss";
import {
    useAppTheme,
    useDefaultAppThemeHandling,
} from "@/services/theme-service/theme-service.hooks";

const ThemeProvider = ({ children }: PropsWithChildren) => {
    useDefaultAppThemeHandling();

    const theme = useAppTheme();

    useEffect(() => {
        if (theme?.isDark) document.body.classList.add(styles.darkBody);
        return () => document.body.classList.remove(styles.darkBody);
    }, [theme?.isDark]);

    return <ConfigProvider theme={theme ?? undefined}>{children}</ConfigProvider>;
};

export default ThemeProvider;
