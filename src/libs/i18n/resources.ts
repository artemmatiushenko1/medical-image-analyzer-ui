import en from '@/locales/en/translation.json';
import commonEn from '@/locales/en/common.json';
import newImageEn from '@/locales/en/new-image.json';

import uk from '@/locales/uk/translation.json';

const resources = {
  en: {
    Common: commonEn,
    NewImage: newImageEn,
    translation: en,
  },
  uk: {
    translation: uk,
  },
} as const;

export { resources };
