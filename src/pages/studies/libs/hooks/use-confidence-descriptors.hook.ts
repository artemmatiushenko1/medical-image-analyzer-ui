import { useTranslation } from 'react-i18next';
import { ConfidenceThreshold } from '../enums';
import { getConfidenceThreshold } from '../helpers';
import { cinnabar, emerald } from '@/libs/theme/colors';
import { amber } from '@mui/material/colors';

const useConfidenceDescriptors = (confidence: number) => {
  const { t } = useTranslation('Studies');

  const TEXT_BY_CONFIDENCE_THRESHOLD = {
    [ConfidenceThreshold.LOW]: {
      title: t('Confidence.Negative.Title'),
      description: t('Confidence.Negative.Caption'),
    },
    [ConfidenceThreshold.MEDIUM]: {
      title: t('Confidence.Uncertain.Title'),
      description: t('Confidence.Uncertain.Caption'),
    },
    [ConfidenceThreshold.HIGH]: {
      title: t('Confidence.Positive.Title'),
      description: t('Confidence.Positive.Caption'),
    },
  };

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

  const threshold = getConfidenceThreshold(confidence ?? 0);
  const text = TEXT_BY_CONFIDENCE_THRESHOLD[threshold];
  const color = COLOR_BY_CONFIDENCE_THRESHOLD[threshold];

  return { text, color, threshold };
};

export { useConfidenceDescriptors };
