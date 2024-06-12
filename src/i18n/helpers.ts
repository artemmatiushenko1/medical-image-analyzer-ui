import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';
import dayjs from 'dayjs';

const initi18n = (language: ValueOf<typeof Language>) => {
  return i18n.use(initReactI18next).init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false,
    },
  });
};

const initDayJs = async (language: ValueOf<typeof Language>) => {
  try {
    const locales = {
      [Language.ENGLISH]: () => import('dayjs/locale/en.js'),
      [Language.UKRAINIAN]: () => import('dayjs/locale/uk.js'),
    };

    await locales[language]?.();
    dayjs.locale(language);
  } catch (error) {
    console.error(`Error loading locale ${language}`, error);
  }
};

export { initi18n, initDayJs };
