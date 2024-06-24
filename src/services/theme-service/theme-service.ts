import { makeVar } from "@apollo/client";
import { localStorageService } from "../storage-service";
import { IThemeService, ThemePrefVariant, ThemeVariant } from "./theme-service.types";
import { StorageKeys } from "@/constants";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";
import { darkTheme, lightTheme } from "./themes";

class ThemeService implements IThemeService {
    theme = makeVar<ThemeVariant>(null);
    themePref = makeVar<ThemePrefVariant>(null);

    constructor() {
        const themePref = localStorageService.getItem<ThemePrefVariant>(StorageKeys.Theme);

        this.setThemePref(themePref ?? "default");
        this.setTheme(themePref ?? "default");
    }

    updateTheme(themePref: ThemePrefVariant) {
        this.themePref(themePref);

        localStorageService.setItem(StorageKeys.Theme, themePref);

        switch (themePref) {
            case "dark": {
                this.theme(darkTheme);
                break;
            }
            case "light": {
                this.theme(lightTheme);
                break;
            }
            default: {
                if (window.matchMedia(THEME_PREF_MEDIA_QUERY).matches) this.theme(darkTheme);
                else this.theme(lightTheme);
            }
        }
    }

    setThemePref(themePref: ThemePrefVariant) {
        this.themePref(themePref);

        localStorageService.setItem(StorageKeys.Theme, themePref);
    }

    setTheme(themePref: ThemePrefVariant) {
        switch (themePref) {
            case "dark": {
                this.theme(darkTheme);
                break;
            }
            case "light": {
                this.theme(lightTheme);
                break;
            }
            default: {
                if (window.matchMedia(THEME_PREF_MEDIA_QUERY).matches) this.theme(darkTheme);
                else this.theme(lightTheme);
            }
        }
    }
}

export const themeService = new ThemeService();
