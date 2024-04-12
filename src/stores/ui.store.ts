import { create } from 'zustand';

interface UiState {
  sidebarCollapsed: boolean;

  toggleSidebarCollapsed: () => void;
}

const useUiStore = create<UiState>()((set, get) => ({
  sidebarCollapsed: false,

  toggleSidebarCollapsed: () => {
    set({ sidebarCollapsed: !get().sidebarCollapsed });
  },
}));

export { useUiStore };
