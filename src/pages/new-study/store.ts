import { create } from 'zustand';
import { Coordinates } from 'react-advanced-cropper';
import { CropSettings } from './components/image-crop-dialog';
import { CreateStudyRequest } from '@/packages/studies';
import { base64ToFile } from '@/libs/helpers';
import dayjs from 'dayjs';

type State = {
  uploadedImageSrc: string | null;
  croppedImageSrc: string | null;
  currentCrop?: Coordinates;
  cropSettings?: CropSettings;
  selectedDianosticIds: string[];
  createStudyStatusDialogOpen: boolean;
  selectedModelIds: Record<string, string[]>;
  name: string;
  description?: string;
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
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  getCreateStudyPayload: () => CreateStudyRequest;
};

const INITIAL_STATE: State = {
  currentCrop: undefined,
  uploadedImageSrc: null,
  croppedImageSrc: null,
  cropSettings: undefined,
  selectedDianosticIds: [],
  createStudyStatusDialogOpen: false,
  selectedModelIds: {},
  name: '',
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
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  reset: () => {
    set(INITIAL_STATE);
  },
  getCreateStudyPayload: () => {
    const {
      name,
      description,
      selectedModelIds,
      croppedImageSrc,
      uploadedImageSrc,
    } = get();

    const modelIds = Object.values(selectedModelIds).flatMap((item) => item);

    const studyImage = croppedImageSrc ?? uploadedImageSrc;

    if (!studyImage) {
      throw new Error('Study image is required!');
    }

    const file = base64ToFile(
      studyImage,
      `${name.toLowerCase()}_${dayjs().format()}`,
    );

    return { name, description, modelIds, file };
  },
}));

export { useNewStudyStore };
