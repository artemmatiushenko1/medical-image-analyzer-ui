import { User } from '@/packages/users';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  user: User | null;

  setUser: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

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
