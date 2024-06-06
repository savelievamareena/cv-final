import { Language } from "cv-graphql";

export interface LanguagesResult {
    languages: Language[];
}

export interface CreateLanguageResult {
    createLanguage: Language;
}

export interface UpdateLanguageResult {
    updateLanguage: Language;
}
