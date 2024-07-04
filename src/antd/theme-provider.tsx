import { ConfigProvider } from "antd";
import { PropsWithChildren, useEffect } from "react";
import { useAppTheme, useDefaultAppThemeHandling } from "@/services/theme-service";
import styles from "./theme-provider.module.scss";

const ThemeProvider = ({ children }: PropsWithChildren) => {
    useDefaultAppThemeHandling();

    const theme = useAppTheme();

    useEffect(() => {
        const className = theme && styles[`${theme.name}`];

        if (!className) return;

        document.body.classList.add(className);

        return () => document.body.classList.remove(className);
    }, [theme?.name]);

    return <ConfigProvider theme={theme ?? undefined}>{children}</ConfigProvider>;
};

export default ThemeProvider;
