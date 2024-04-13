import { CropSettings } from './types';

const MIN_SCALE = 1;

const MAX_SCALE = 2;

const SCALE_STEP = 0.01;

const DEFAULT_CROP_SETTINGS: CropSettings = {
  scale: MIN_SCALE,
  rotation: 0,
  preserveAspectRatio: false,
};

export { DEFAULT_CROP_SETTINGS, MAX_SCALE, MIN_SCALE, SCALE_STEP };
