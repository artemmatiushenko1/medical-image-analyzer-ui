import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import i18next from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  language: ValueOf<typeof Language>;

  changeLanguage: (newLanguage: ValueOf<typeof Language>) => void;
};

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: Language.ENGLISH,

      changeLanguage: (newLanguage: ValueOf<typeof Language>) => {
        set({ language: newLanguage });
        i18next.changeLanguage(newLanguage);
        window.location.reload();
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({ language: state.language }),
    },
  ),
);

export { useAppStore };
