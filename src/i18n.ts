import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export enum Languages {
    Ru = "ru",
    En = "en",
}

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        supportedLngs: [Languages.En, Languages.Ru],

        fallbackLng: Languages.En,
    });

export default i18n;
