import { PercentCrop } from 'react-image-crop';
import { create } from 'zustand';
import { Diagnostic, Model } from '@/packages/diagnostics';
import {
  MOCK_DIAGNOSTICS,
  MOCK_MODELS,
} from '@/mocks/handlers/diagnostics/mocks';
import { Coordinates } from 'react-advanced-cropper';

type State = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop: PercentCrop | undefined;
  cropSettings?: Coordinates;
  selectedDianosticIds: string[];
  createStudyStatusDialogOpen: boolean;
  selectedModelIds: string[];
  availableModels: Model[];
  availableDiagnostics: Diagnostic[];
};

type Actions = {
  setCurrentCrop: (currentCrop: PercentCrop) => void;
  setUploadedImageSrc: (uploadedImageSrc: string | null) => void;
  setCroppedImageSrc: (croppedImageSrc: string | null) => void;
  setCropSettings: (cropSettings: Coordinates) => void;
  resetCrop: () => void;
  updateSelectedDiagnostictIds: (newId: string) => void;
  setCreateStudyStatusDialogOpen: (newOpen: boolean) => void;
  reset: () => void;
  updateSelectedModelIds: (ids: string[]) => void;
};

const INITIAL_STATE: State = {
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: undefined,
  selectedDianosticIds: [],
  createStudyStatusDialogOpen: false,
  selectedModelIds: [],
  availableModels: MOCK_MODELS,
  availableDiagnostics: MOCK_DIAGNOSTICS,
};

const useNewStudyStore = create<State & Actions>()((set, get) => ({
  ...INITIAL_STATE,

  setCurrentCrop: (currentCrop: PercentCrop) => set({ currentCrop }),
  setUploadedImageSrc: (uploadedImageSrc: string | null) =>
    set({ uploadedImageSrc }),
  setCroppedImageSrc: (croppedImageSrc: string | null) =>
    set({ croppedImageSrc }),
  setCropSettings: (coordinates: Coordinates) =>
    set({ cropSettings: coordinates }),
  resetCrop: () => set({ cropSettings: undefined, currentCrop: undefined }),
  updateSelectedDiagnostictIds: (newId: string) => {
    const prevIds = get().selectedDianosticIds;

    if (prevIds.indexOf(newId) !== -1) {
      set({
        selectedDianosticIds: prevIds.filter((item) => item !== newId),
      });
    } else {
      set({ selectedDianosticIds: Array.from(new Set([...prevIds, newId])) });
    }
  },
  updateSelectedModelIds: (newIds: string[]) => {
    set({ selectedModelIds: newIds });
  },
  setCreateStudyStatusDialogOpen: (newOpen) => {
    set({ createStudyStatusDialogOpen: newOpen });
  },
  reset: () => {
    set(INITIAL_STATE);
  },
}));

export { useNewStudyStore };
