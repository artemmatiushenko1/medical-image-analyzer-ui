import { MIN_IMAGE_DIMENSIONS_PX } from '../../constants';
import { CropSettings } from './types';

const MIN_SCALE = 1;
const MAX_SCALE = 2;
const SCALE_STEP = 0.01;
const DEFAULT_ASPECT_RATIO = 1;
const INITIAL_CROP_WIDTH_PERCENTAGE = 90;

const MIN_CROP_WIDTH_PX = MIN_IMAGE_DIMENSIONS_PX;

const DEFAULT_CROP_SETTINGS: CropSettings = {
  scale: MIN_SCALE,
  rotation: 0,
  preserveAspectRatio: false,
};

export {
  DEFAULT_CROP_SETTINGS,
  MAX_SCALE,
  MIN_SCALE,
  SCALE_STEP,
  DEFAULT_ASPECT_RATIO,
  MIN_CROP_WIDTH_PX,
  INITIAL_CROP_WIDTH_PERCENTAGE,
};
