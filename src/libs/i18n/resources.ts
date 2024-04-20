import commonEn from '@/locales/en/common.json';
import newStudyEn from '@/locales/en/new-study.json';
import appEn from '@/locales/en/app.json';

import appUk from '@/locales/uk/app.json';

const resources = {
  en: {
    Common: commonEn,
    NewStudy: newStudyEn,
    App: appEn,
  },
  uk: {
    App: appUk,
  },
} as const;

export { resources };
