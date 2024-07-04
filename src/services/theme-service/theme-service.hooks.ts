import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";
import { themeService } from "./theme-service";
import { ThemePreference } from "./theme-service.constants";

export const useUserThemePreference = () => useReactiveVar(themeService.userThemePreference);

export const useAppTheme = () => useReactiveVar(themeService.theme);

export const useDefaultAppThemeHandling = () => {
    const themePreference = useUserThemePreference();

    useEffect(() => {
        if (themePreference !== ThemePreference.Default) return;

        const evListenner = (e: MediaQueryListEvent) => {
            if (e.matches) themeService.setTheme(ThemePreference.Dark);
            else themeService.setTheme(ThemePreference.Light);
        };

        const mediaQueryList = window.matchMedia(THEME_PREF_MEDIA_QUERY);

        mediaQueryList.addEventListener("change", evListenner);

        return () => mediaQueryList.removeEventListener("change", evListenner);
    }, [themePreference]);
};
