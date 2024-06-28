import { darkTheme, lightTheme } from "./themes";
import { AppThemeConfig } from "./themes/types";

export const enum ThemePreference {
    Dark = "dark",
    Light = "light",
    Default = "default",
}

export const Themes: Record<ThemePreference, AppThemeConfig | null> = {
    [ThemePreference.Dark]: darkTheme,
    [ThemePreference.Light]: lightTheme,
    [ThemePreference.Default]: null,
};
