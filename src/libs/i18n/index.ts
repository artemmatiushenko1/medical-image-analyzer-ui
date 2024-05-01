import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';
import { Language } from '../enums';
import { ValueOf } from '../types';
import { LANGUAGE_DETAILS } from './constants';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}

const initi18n = (initialLanguage: ValueOf<typeof Language>) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

export { initi18n, LANGUAGE_DETAILS };
