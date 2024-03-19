import { create } from 'zustand';

interface UiState {
  sidebarCollapsed: boolean;
  newImageDialogOpen: boolean;

  toggleSidebarCollapsed: () => void;
  toggleNewImageDialogOpen: () => void;
}

const useUiStore = create<UiState>()((set, get) => ({
  sidebarCollapsed: false,
  newImageDialogOpen: false,

  toggleSidebarCollapsed: () => {
    set({ sidebarCollapsed: !get().sidebarCollapsed });
  },
  toggleNewImageDialogOpen: () => {
    set({ newImageDialogOpen: !get().newImageDialogOpen });
  },
}));

export { useUiStore };
