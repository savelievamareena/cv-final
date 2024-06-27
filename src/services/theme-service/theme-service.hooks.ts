import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { themeService } from "./theme-service";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";

export const useAppThemePref = () => useReactiveVar(themeService.themePref);

export const useIsDarkAppTheme = () => useReactiveVar(themeService.isDarkScheme);

export const useAppTheme = () => useReactiveVar(themeService.theme);

export const useDefaultAppThemeHandling = () => {
    const themePref = useAppThemePref();

    useEffect(() => {
        if (themePref !== "default") return;

        const evListenner = (e: MediaQueryListEvent) => {
            if (e.matches) themeService.setTheme("dark");
            else themeService.setTheme("light");
        };

        const mediaQueryList = window.matchMedia(THEME_PREF_MEDIA_QUERY);

        mediaQueryList.addEventListener("change", evListenner);

        return () => mediaQueryList.removeEventListener("change", evListenner);
    }, [themePref]);
};
