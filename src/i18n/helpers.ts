import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';
import dayjs from 'dayjs';

const initi18n = (initialLanguage: ValueOf<typeof Language>) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

const initDayJs = async (initialLanguage: ValueOf<typeof Language>) => {
  try {
    await import(`dayjs/locale/${initialLanguage}`);
    dayjs.locale(initialLanguage);
  } catch (error) {
    console.error(`Error loading locale ${initialLanguage}`, error);
  }
};

export { initi18n, initDayJs };
