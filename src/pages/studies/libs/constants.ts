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

const TEXT_BY_CONFIDENCE_THRESHOLD = {
  [ConfidenceThreshold.LOW]: {
    title: '- Negative',
    description:
      'Initial assessment indicates a failry low probability of the disease under study. Ongoing monitoring or additional tests may be necessary to confirm this conclusion',
  },
  [ConfidenceThreshold.MEDIUM]: {
    title: 'Uncertain',
    description:
      'The current assessment suggests uncertainty regarding the presence of the disease under study. Further investigation is needed to confirm its absence or presence definitively.',
  },
  [ConfidenceThreshold.HIGH]: {
    title: '+ Positive',
    description:
      "There's a high risk of a disease under study. Please contact a doctor as soon as possible for a furher examination.",
  },
};

export {
  MAX_STUDY_LOADING_PREVIEWS,
  COLOR_BY_CONFIDENCE_THRESHOLD,
  TEXT_BY_CONFIDENCE_THRESHOLD,
};
