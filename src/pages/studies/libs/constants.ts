import { cinnabar, emerald } from '@/libs/theme/colors';
import { ConfidenceThreshold } from './enums';
import { amber } from '@mui/material/colors';

const MAX_STUDY_LOADING_PREVIEWS = 6;

const COLOR_BY_CONFIDENCE_THRESHOLD = {
  [ConfidenceThreshold.LOW]: {
    dark: emerald[400],
    light: emerald[200],
  },
  [ConfidenceThreshold.MEDIUM]: {
    dark: amber[400],
    light: amber[200],
  },
  [ConfidenceThreshold.HIGH]: {
    dark: cinnabar[400],
    light: cinnabar[200],
  },
};

export { MAX_STUDY_LOADING_PREVIEWS, COLOR_BY_CONFIDENCE_THRESHOLD };
