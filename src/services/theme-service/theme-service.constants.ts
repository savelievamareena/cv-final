import { darkTheme, lightTheme } from "./themes";
import { AppThemeConfig } from "./themes/types";

export enum ThemePreference {
    Default = "default",
    Dark = "dark",
    Light = "light",
}

export const Themes: Record<ThemePreference, AppThemeConfig | null> = {
    [ThemePreference.Dark]: darkTheme,
    [ThemePreference.Light]: lightTheme,
    [ThemePreference.Default]: null,
};
