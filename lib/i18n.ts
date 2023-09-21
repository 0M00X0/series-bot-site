import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const supportedLanguages = ["en", "ar"];

const enTranslationSettings = require("../locales/en/settings.json");
const enTranslationAuth = require("../locales/en/auth.json");
const enTranslation = { ...enTranslationSettings, ...enTranslationAuth };

const arTranslationSettings = require("../locales/ar/settings.json");
const arTranslationAuth = require("../locales/ar/auth.json");
const arTranslation = { ...arTranslationSettings, ...arTranslationAuth };

const isLocalStorageAvailable = typeof localStorage !== "undefined";

const savedLanguage = isLocalStorageAvailable
  ? localStorage.getItem("language")
  : null;
const defaultLanguage = savedLanguage || "en";

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: "en",
  supportedLngs: supportedLanguages,

  resources: {
    en: { auth: enTranslationAuth, settings: enTranslationSettings },
    ar: { auth: arTranslationAuth, settings: arTranslationSettings },
  },

  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  if (isLocalStorageAvailable) {
    localStorage.setItem("language", lng);
  }
};

export default i18n;
