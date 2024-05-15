import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

const initi18n = (initialLanguage: ValueOf<typeof Language>) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

export { initi18n };
