import { makeVar } from "@apollo/client";
import { localStorageService } from "../storage-service";
import { IThemeService, ThemePrefVariant, ThemeVariant } from "./theme-service.types";
import { darkTheme, lightTheme } from "./themes";
import { StorageKeys } from "@/constants";
import { THEME_PREF_MEDIA_QUERY } from "@/constants/theme";

class ThemeService implements IThemeService {
    theme = makeVar<ThemeVariant>(null);
    themePref = makeVar<ThemePrefVariant>(null);
    isDarkScheme = makeVar<boolean>(false);

    constructor() {
        const themePref = localStorageService.getItem<ThemePrefVariant>(StorageKeys.Theme);

        this.updateTheme(themePref ?? "default");
    }

    updateTheme(themePref: ThemePrefVariant) {
        this.setThemePref(themePref);
        this.setTheme(themePref);
    }

    setThemePref(themePref: ThemePrefVariant) {
        this.themePref(themePref);

        localStorageService.setItem(StorageKeys.Theme, themePref);
    }

    setTheme(themePref: ThemePrefVariant) {
        switch (themePref) {
            case "dark": {
                this.theme(darkTheme);
                this.isDarkScheme(true);
                break;
            }
            case "light": {
                this.theme(lightTheme);
                this.isDarkScheme(false);
                break;
            }
            default: {
                if (window.matchMedia(THEME_PREF_MEDIA_QUERY).matches) {
                    this.theme(darkTheme);
                    this.isDarkScheme(true);
                } else {
                    this.theme(lightTheme);
                    this.isDarkScheme(false);
                }
            }
        }
    }
}

export const themeService = new ThemeService();
