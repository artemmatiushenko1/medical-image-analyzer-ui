import { User } from '@/packages/users';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  user: User | null;
};

type AuthActions = {
  setUser: (user: User) => void;
  logout: () => void;
};

const INITIAL_STATE: AuthState = {
  user: null,
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export { useAuthStore };
