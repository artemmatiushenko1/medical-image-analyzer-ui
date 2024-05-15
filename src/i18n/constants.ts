import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';

const LANGUAGE_DETAILS: Record<
  ValueOf<typeof Language>,
  { enVariant?: string; nativeVariant: string }
> = {
  'en': {
    nativeVariant: 'English',
  },
  'uk': {
    enVariant: 'Ukrainian',
    nativeVariant: 'Українська',
  },
};

export { LANGUAGE_DETAILS };
