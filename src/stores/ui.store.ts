import { create } from 'zustand';

interface ProfileState {
  sidebarCollapsed: boolean;

  toggleSidebarCollapsed: () => void;
}

const useUiStore = create<ProfileState>()((set, get) => ({
  sidebarCollapsed: false,

  toggleSidebarCollapsed: () => {
    set({ sidebarCollapsed: !get().sidebarCollapsed });
  },
}));

export { useUiStore };
