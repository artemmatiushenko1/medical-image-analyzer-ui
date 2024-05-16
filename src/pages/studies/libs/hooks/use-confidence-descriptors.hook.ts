import {
  COLOR_BY_CONFIDENCE_THRESHOLD,
  TEXT_BY_CONFIDENCE_THRESHOLD,
} from '../constants';
import { getConfidenceThreshold } from '../helpers';

const useConfidenceDescriptors = (confidence: number) => {
  const threshold = getConfidenceThreshold(confidence ?? 0);
  const text = TEXT_BY_CONFIDENCE_THRESHOLD[threshold];
  const color = COLOR_BY_CONFIDENCE_THRESHOLD[threshold];

  return { text, color, threshold };
};

export { useConfidenceDescriptors };
