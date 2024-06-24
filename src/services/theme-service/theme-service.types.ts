import { ThemeConfig } from "antd";
export interface IThemeService {
    setThemePref(themePref: ThemePrefVariant): void;
    setTheme(themePref: ThemePrefVariant): void;
}

export type ThemePrefVariant = "dark" | "light" | "default" | null;

export type ThemeVariant = ThemeConfig | null;
