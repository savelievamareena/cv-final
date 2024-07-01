import { ThemePreference } from "./theme-service.constants";
export interface IThemeService {
    setUserThemePreference(themePreference: ThemePreference): void;
    setTheme(themePreference: ThemePreference): void;
    updateTheme(themePreference: ThemePreference): void;
}
