import { useReactiveVar } from "@apollo/client";
import { themeService } from "./theme-service";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";
import { useCallback, useEffect, useState } from "react";

export const useAppThemePref = () => useReactiveVar(themeService.themePref);

export const useAppTheme = () => {
    const themePref = useReactiveVar(themeService.themePref);
    const theme = useReactiveVar(themeService.theme);

    const [isDark, setIsDark] = useState(
        themePref === "dark" ||
            (themePref === "default" && window.matchMedia(THEME_PREF_MEDIA_QUERY).matches)
    );

    const evListenner = useCallback(
        (e: MediaQueryListEvent) => {
            if (themePref !== "default") return;

            setIsDark(e.matches);

            if (e.matches) themeService.setTheme("dark");
            else themeService.setTheme("light");
        },
        [themePref]
    );

    useEffect(() => {
        setIsDark(
            themePref === "dark" ||
                (themePref === "default" && window.matchMedia(THEME_PREF_MEDIA_QUERY).matches)
        );

        const l = window.matchMedia(THEME_PREF_MEDIA_QUERY);

        l.addEventListener("change", evListenner);

        return () => l.removeEventListener("change", evListenner);
    }, [themePref, evListenner]);

    useEffect(() => {
        if (isDark) themeService.setTheme("dark");
        else themeService.setTheme("light");
    }, [isDark]);

    return {
        isDark,
        theme,
    };
};
