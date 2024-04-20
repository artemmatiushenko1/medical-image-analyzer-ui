import en from '@/locales/en/translation.json';
import commonEn from '@/locales/en/common.json';
import newStudyEn from '@/locales/en/new-study.json';
import appEn from '@/locales/en/app.json';

import uk from '@/locales/uk/translation.json';
import appUk from '@/locales/uk/app.json';

const resources = {
  en: {
    Common: commonEn,
    NewStudy: newStudyEn,
    App: appEn,
    translation: en,
  },
  uk: {
    App: appUk,
    translation: uk,
  },
} as const;

export { resources };
