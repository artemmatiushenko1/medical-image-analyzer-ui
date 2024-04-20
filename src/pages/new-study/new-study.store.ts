import { PercentCrop } from 'react-image-crop';
import { create } from 'zustand';
import { CropSettings } from './libs/components/image-crop-dialog';
import { DEFAULT_CROP_SETTINGS } from './libs/components/image-crop-dialog';

type NewStudyState = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop: PercentCrop | undefined;
  cropSettings: CropSettings;

  setCurrentCrop: (currentCrop: PercentCrop) => void;
  setUploadedImageSrc: (uploadedImageSrc: string | null) => void;
  setCroppedImageSrc: (croppedImageSrc: string | null) => void;
  setCropSettings: (cropSettings: CropSettings) => void;
  resetCrop: () => void;
};

const useNewStudyStore = create<NewStudyState>()((set) => ({
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: DEFAULT_CROP_SETTINGS,

  setCurrentCrop: (currentCrop: PercentCrop) => set({ currentCrop }),
  setUploadedImageSrc: (uploadedImageSrc: string | null) =>
    set({ uploadedImageSrc }),
  setCroppedImageSrc: (croppedImageSrc: string | null) =>
    set({ croppedImageSrc }),
  setCropSettings: (cropSettings: CropSettings) => set({ cropSettings }),
  resetCrop: () =>
    set({ cropSettings: DEFAULT_CROP_SETTINGS, currentCrop: undefined }),
}));

export { useNewStudyStore };
