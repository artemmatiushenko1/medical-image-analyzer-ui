import { Language } from '@/libs/enums';
import { ThemeMode } from '@/libs/theme';
import { ValueOf } from '@/libs/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  language: ValueOf<typeof Language>;
  themeMode: ValueOf<typeof ThemeMode>;

  changeLanguage: (newLanguage: ValueOf<typeof Language>) => void;
  changeThemeMode: (themeMode: ValueOf<typeof ThemeMode>) => void;
};

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: Language.ENGLISH,
      themeMode: ThemeMode.LIGHT,

      changeLanguage: (newLanguage: ValueOf<typeof Language>) => {
        set({ language: newLanguage });
        window.location.reload();
      },
      changeThemeMode: (themeMode: ValueOf<typeof ThemeMode>) => {
        set({ themeMode });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        language: state.language,
        themeMode: state.themeMode,
      }),
    },
  ),
);

export { useAppStore };
