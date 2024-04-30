import { Language } from '@/libs/enums';
import i18n from '@/libs/i18n';
import { ValueOf } from '@/libs/types';
import { create } from 'zustand';

type AppState = {
  language: ValueOf<typeof Language>;

  changeLanguage: (newLanguage: ValueOf<typeof Language>) => void;
};

const useAppStore = create<AppState>()((set) => ({
  language: Language.ENGLISH,

  changeLanguage: (newLanguage: ValueOf<typeof Language>) => {
    set({ language: newLanguage });
    i18n.changeLanguage(newLanguage);
  },
}));

export { useAppStore };
