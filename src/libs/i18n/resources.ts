import en from '@/locales/en/translation.json';
import commonEn from '@/locales/en/common.json';

import uk from '@/locales/uk/translation.json';

const resources = {
  en: {
    common: commonEn,
    translation: en,
  },
  uk: {
    translation: uk,
  },
} as const;

export { resources };
