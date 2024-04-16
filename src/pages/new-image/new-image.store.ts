import { Crop } from 'react-image-crop';
import { create } from 'zustand';
import { CropSettings } from './libs/components/image-crop-dialog';
import { DEFAULT_CROP_SETTINGS } from './libs/components/image-crop-dialog';

type NewImageState = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop: Crop | undefined;
  cropSettings: CropSettings;

  setCurrentCrop: (currentCrop: Crop) => void;
  setUploadedImageSrc: (uploadedImageSrc: string | null) => void;
  setCroppedImageSrc: (croppedImageSrc: string | null) => void;
  setCropSettings: (cropSettings: CropSettings) => void;
  resetCrop: () => void;
};

const useNewImageStore = create<NewImageState>()((set) => ({
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: DEFAULT_CROP_SETTINGS,

  setCurrentCrop: (currentCrop: Crop) => set({ currentCrop }),
  setUploadedImageSrc: (uploadedImageSrc: string | null) =>
    set({ uploadedImageSrc }),
  setCroppedImageSrc: (croppedImageSrc: string | null) =>
    set({ croppedImageSrc }),
  setCropSettings: (cropSettings: CropSettings) => set({ cropSettings }),
  resetCrop: () =>
    set({ cropSettings: DEFAULT_CROP_SETTINGS, currentCrop: undefined }),
}));

export { useNewImageStore };
