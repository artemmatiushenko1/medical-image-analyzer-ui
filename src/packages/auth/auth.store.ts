import { User } from '@/packages/users';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  user: User | null;
};

type AuthActions = {
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
};

const INITIAL_STATE: AuthState = {
  user: null,
  accessToken: null,
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setAccessToken: (accessToken: string) => set({ accessToken }),
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user, // TODO: remove
      }),
    },
  ),
);

export { useAuthStore };
