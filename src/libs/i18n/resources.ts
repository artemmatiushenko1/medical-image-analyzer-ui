import en from '@/locales/en/translation.json';
import commonEn from '@/locales/en/common.json';
import newImageEn from '@/locales/en/new-image.json';
import appEn from '@/locales/en/app.json';

import uk from '@/locales/uk/translation.json';
import appUk from '@/locales/uk/app.json';

const resources = {
  en: {
    Common: commonEn,
    NewImage: newImageEn,
    App: appEn,
    translation: en,
  },
  uk: {
    App: appUk,
    translation: uk,
  },
} as const;

export { resources };
