import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { toPercentString } from '@/libs/helpers';
import { getConfidenceThreshold } from '../../helpers';
import {
  COLOR_BY_CONFIDENCE_THRESHOLD,
  TEXT_BY_CONFIDENCE_THRESHOLD,
} from '../../constants';

const CONFIDENCE_PROGRESS_SIZE = '85px';
const CONFIDENCE_PROGRESS_THICKNESS = 4.5;

type ConfidenceWidgetProps = {
  confidence: number;
};

const ConfidenceWidget = (props: ConfidenceWidgetProps) => {
  const { confidence } = props;

  const confidenceThreshold = getConfidenceThreshold(confidence);
  const colors = COLOR_BY_CONFIDENCE_THRESHOLD[confidenceThreshold];
  const text = TEXT_BY_CONFIDENCE_THRESHOLD[confidenceThreshold];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.progressWrapper}>
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{ color: colors.light }}
          size={CONFIDENCE_PROGRESS_SIZE}
          thickness={CONFIDENCE_PROGRESS_THICKNESS}
        />
        <CircularProgress
          variant="determinate"
          value={confidence * 100}
          sx={{ ...styles.progressValueTrack, color: colors.dark }}
          size={CONFIDENCE_PROGRESS_SIZE}
          thickness={CONFIDENCE_PROGRESS_THICKNESS}
        />
        <Box
          sx={{
            ...styles.progressPercentage,
            height: CONFIDENCE_PROGRESS_SIZE,
          }}
        >
          <Typography
            variant="subtitle2"
            fontSize="16px"
            sx={{
              display: 'inline-block',
            }}
          >
            {toPercentString(confidence)}
          </Typography>
        </Box>
      </Box>
      <Stack>
        <Typography fontWeight={600}>{text.title}</Typography>
        <Typography variant="caption">{text.description}</Typography>
      </Stack>
    </Box>
  );
};

export { ConfidenceWidget };
