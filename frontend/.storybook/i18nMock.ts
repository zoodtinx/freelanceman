import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';

i18next.use(HttpBackend).use(initReactI18next).init({
   fallbackLng: 'en',
   lng: 'en', // default language
   debug: true,
   interpolation: {
     escapeValue: false,
   },
   backend: {
     loadPath: '/locales/{{lng}}/{{ns}}.json',
   },
   // Optional: add supported languages
   supportedLngs: ['en', 'th'],
 })

 export default i18next