import { create } from 'zustand';
import { Coordinates } from 'react-advanced-cropper';
import { CropSettings } from './components/image-crop-dialog';

type State = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop?: Coordinates;
  cropSettings?: CropSettings;
  selectedDianosticIds: string[];
  createStudyStatusDialogOpen: boolean;
  selectedModelIds: Record<string, string[]>;
};

type Actions = {
  setCurrentCrop: (currentCrop: Coordinates) => void;
  setUploadedImageSrc: (uploadedImageSrc: string | null) => void;
  setCroppedImageSrc: (croppedImageSrc: string | null) => void;
  setCropSettings: (cropSettings: CropSettings) => void;
  resetCrop: () => void;
  updateSelectedDiagnostictIds: (newId: string) => void;
  setCreateStudyStatusDialogOpen: (newOpen: boolean) => void;
  reset: () => void;
  updateSelectedModelIds: (diagnosticId: string, modelIds: string[]) => void;
};

const INITIAL_STATE: State = {
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: undefined,
  selectedDianosticIds: [],
  createStudyStatusDialogOpen: false,
  selectedModelIds: {},
};

const useNewStudyStore = create<State & Actions>()((set, get) => ({
  ...INITIAL_STATE,

  setCurrentCrop: (currentCrop: Coordinates) => set({ currentCrop }),
  setUploadedImageSrc: (uploadedImageSrc: string | null) =>
    set({ uploadedImageSrc }),
  setCroppedImageSrc: (croppedImageSrc: string | null) =>
    set({ croppedImageSrc }),
  setCropSettings: (cropSettings: CropSettings) => set({ cropSettings }),
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
  updateSelectedModelIds: (diagnosticId: string, modelIds: string[]) => {
    set({
      selectedModelIds: {
        ...get().selectedModelIds,
        [diagnosticId]: modelIds,
      },
    });
  },
  setCreateStudyStatusDialogOpen: (newOpen) => {
    set({ createStudyStatusDialogOpen: newOpen });
  },
  reset: () => {
    set(INITIAL_STATE);
  },
}));

export { useNewStudyStore };
