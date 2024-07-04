import { makeVar } from "@apollo/client";
import { StorageKeys } from "@/constants";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";
import { localStorageService } from "../storage-service";
import { ThemePreference, Themes } from "./theme-service.constants";
import { IThemeService } from "./theme-service.types";
import { AppThemeConfig } from "./themes/types";

class ThemeService implements IThemeService {
    theme = makeVar<AppThemeConfig | null>(null);
    userThemePreference = makeVar<ThemePreference | null>(null);

    constructor() {
        const themePref = localStorageService.getItem<ThemePreference>(StorageKeys.Theme);

        this.updateTheme(themePref ?? ThemePreference.Default);
    }

    updateTheme(themePreference: ThemePreference) {
        this.setUserThemePreference(themePreference);
        this.setTheme(themePreference);
    }

    setUserThemePreference(themePreference: ThemePreference) {
        this.userThemePreference(themePreference);

        localStorageService.setItem(StorageKeys.Theme, themePreference);
    }

    setTheme(themePreference: ThemePreference) {
        const theme = Themes[themePreference];

        if (theme) this.theme(theme);
        else {
            const actualTheme = window.matchMedia(THEME_PREF_MEDIA_QUERY).matches
                ? Themes[ThemePreference.Dark]
                : Themes[ThemePreference.Light];
            this.theme(actualTheme);
        }
    }
}

export const themeService = new ThemeService();
