import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import enContent from "@/locales/en/content.json";
import teCommon from "@/locales/te/common.json";
import teContent from "@/locales/te/content.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        content: enContent,
      },
      te: {
        common: teCommon,
        content: teContent,
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;









