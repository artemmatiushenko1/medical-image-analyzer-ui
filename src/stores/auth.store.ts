import { User } from '@/packages/users';
import { create } from 'zustand';

type AuthState = {
  user: User | null;

  setUser: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));

export { useAuthStore };
