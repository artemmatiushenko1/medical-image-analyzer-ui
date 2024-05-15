import { ConfidenceThreshold } from '../enums';

const getConfidenceThreshold = (confidence: number) => {
  if (confidence <= ConfidenceThreshold.LOW) {
    return ConfidenceThreshold.LOW;
  }

  if (
    confidence > ConfidenceThreshold.LOW &&
    confidence <= ConfidenceThreshold.MEDIUM
  ) {
    return ConfidenceThreshold.MEDIUM;
  }

  return ConfidenceThreshold.HIGH;
};

export { getConfidenceThreshold };
