"use client";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/locales/en.json';
import arTranslation from '@/locales/ar.json';

// تحديد اللغة الافتراضية
const savedLanguage = localStorage.getItem('language');
const defaultLanguage = savedLanguage || 'en';

// تهيئة i18next
i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],

  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },

  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};

export default i18n;
