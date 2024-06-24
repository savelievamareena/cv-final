import { PropsWithChildren, useEffect } from "react";
import { ConfigProvider } from "antd";
import {
    useIsDarkAppTheme,
    useAppTheme,
    useDefaultAppThemeHandling,
} from "@/services/theme-service/theme-service.hooks";

import styles from "./theme-provider.module.scss";

const ThemeProvider = ({ children }: PropsWithChildren) => {
    useDefaultAppThemeHandling();

    const isDarkTheme = useIsDarkAppTheme();
    const theme = useAppTheme();

    useEffect(() => {
        if (isDarkTheme) document.body.classList.add(styles.darkBody);
        return () => document.body.classList.remove(styles.darkBody);
    }, [isDarkTheme]);

    return <ConfigProvider theme={theme ?? undefined}>{children}</ConfigProvider>;
};

export default ThemeProvider;
