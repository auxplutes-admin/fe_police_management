import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import mr from "./locales/mr/translation.json";

// Get stored language from localStorage or use default
const storedLang = localStorage.getItem('i18nextLng') || 'mr';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    mr: { translation: mr }
  },
  lng: storedLang, // Use stored language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

// Override changeLanguage to store selection
const originalChangeLanguage = i18n.changeLanguage;
i18n.changeLanguage = async (lng) => {
  localStorage.setItem('i18nextLng', lng);
  return originalChangeLanguage.call(i18n, lng);
};

export default i18n;