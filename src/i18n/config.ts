import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import enTranslations from './locales/en.json';
import itTranslations from './locales/it.json';

// Get device language
const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      it: {
        translation: itTranslations
      }
    },
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
