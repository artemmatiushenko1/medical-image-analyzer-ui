import commonEn from '@/locales/en/common.json';
import newStudyEn from '@/locales/en/new-study.json';
import appEn from '@/locales/en/app.json';

import commonUk from '@/locales/uk/common.json';
import appUk from '@/locales/uk/app.json';
import newStudyUk from '@/locales/uk/new-study.json';

const resources = {
  en: {
    Common: commonEn,
    NewStudy: newStudyEn,
    App: appEn,
  },
  uk: {
    Common: commonUk,
    App: appUk,
    NewStudy: newStudyUk,
  },
} as const;

export { resources };
