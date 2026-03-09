import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import enTranslations from './locales/en.json';
import itTranslations from './locales/it.json';
import arEgTranslations from './locales/ar-eg.json';
import roTranslations from './locales/ro.json';
import sqTranslations from './locales/sq.json';
import frTranslations from './locales/fr.json';

const LANGUAGE_STORAGE_KEY = '@monolite_preferred_language';

const supportedLanguages = ['en', 'it', 'ar-eg', 'ro', 'sq', 'fr'];

// Get device language
const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';

export const saveLanguagePreference = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

export const loadLanguagePreference = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to load language preference:', error);
    return null;
  }
};

export const initializeI18n = async (): Promise<void> => {
  const savedLanguage = await loadLanguagePreference();
  const initialLanguage = savedLanguage && supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : deviceLanguage;

  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: enTranslations
          },
          it: {
            translation: itTranslations
          },
          'ar-eg': {
            translation: arEgTranslations
          },
          ro: {
            translation: roTranslations
          },
          sq: {
            translation: sqTranslations
          },
          fr: {
            translation: frTranslations
          }
        },
        lng: initialLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        },
        compatibilityJSON: 'v3',
      });
  } else {
    await i18n.changeLanguage(initialLanguage);
  }
};

export default i18n;
