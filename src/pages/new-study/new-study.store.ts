import { PercentCrop } from 'react-image-crop';
import { create } from 'zustand';
import { CropSettings } from './libs/components/image-crop-dialog';
import { DEFAULT_CROP_SETTINGS } from './libs/components/image-crop-dialog';

type NewStudyState = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop: PercentCrop | undefined;
  cropSettings: CropSettings;
  selectedDianosticIds: string[];
  createStudyStatusDialogOpen: boolean;
};

type NewStudyActions = {
  setCurrentCrop: (currentCrop: PercentCrop) => void;
  setUploadedImageSrc: (uploadedImageSrc: string | null) => void;
  setCroppedImageSrc: (croppedImageSrc: string | null) => void;
  setCropSettings: (cropSettings: CropSettings) => void;
  resetCrop: () => void;
  updateSelectedDiagnostictIds: (newId: string) => void;
  setCreateStudyStatusDialogOpen: (newOpen: boolean) => void;
  reset: () => void;
};

const INITIAL_STATE: NewStudyState = {
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: DEFAULT_CROP_SETTINGS,
  selectedDianosticIds: [],
  createStudyStatusDialogOpen: false,
};

const useNewStudyStore = create<NewStudyState & NewStudyActions>()(
  (set, get) => ({
    ...INITIAL_STATE,
    setCurrentCrop: (currentCrop: PercentCrop) => set({ currentCrop }),
    setUploadedImageSrc: (uploadedImageSrc: string | null) =>
      set({ uploadedImageSrc }),
    setCroppedImageSrc: (croppedImageSrc: string | null) =>
      set({ croppedImageSrc }),
    setCropSettings: (cropSettings: CropSettings) => set({ cropSettings }),
    resetCrop: () =>
      set({ cropSettings: DEFAULT_CROP_SETTINGS, currentCrop: undefined }),
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
    setCreateStudyStatusDialogOpen: (newOpen) => {
      set({ createStudyStatusDialogOpen: newOpen });
    },
    reset: () => {
      set(INITIAL_STATE);
    },
  }),
);

export { useNewStudyStore };
