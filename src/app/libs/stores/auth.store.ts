import { queryClient } from '@/libs/packages/react-query';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppQueryKey } from '../enums';

type AuthState = {
  accessToken: string | null;
};

type AuthActions = {
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
};

const INITIAL_STATE: AuthState = {
  accessToken: null,
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setAccessToken: (accessToken: string) => set({ accessToken }),
      logout: () => {
        set({ accessToken: null });
        queryClient.removeQueries({ queryKey: AppQueryKey.GET_PROFILE });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    },
  ),
);

export { useAuthStore };
