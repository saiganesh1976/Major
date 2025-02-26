import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./english.json";
import hiTranslation from "./hindi.json";
import teTranslation from "./telugu.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    hi: { translation: hiTranslation },
    te: { translation: teTranslation }
  },
  
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
