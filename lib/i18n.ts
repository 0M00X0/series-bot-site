import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const supportedLanguages = ["en", "ar"];

const enTranslationSettings = require("../locales/en/settings.json");
const enTranslationSeries = require("../locales/en/series.json");

const arTranslationSettings = require("../locales/ar/settings.json");
const arTranslationSeries = require("../locales/ar/series.json");

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
    en: { series: enTranslationSeries, settings: enTranslationSettings },
    ar: { series: arTranslationSeries, settings: arTranslationSettings },
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
