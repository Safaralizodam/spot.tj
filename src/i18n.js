// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationTJ from './locales/tj/translation.json';

const resources = {
  en: { translation: translationEN },
  ru: { translation: translationRU },
  tj: { translation: translationTJ },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
