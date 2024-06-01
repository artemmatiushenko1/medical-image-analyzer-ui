import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { toPercentString } from '@/libs/helpers';
import { useConfidenceDescriptors } from '../../libs/hooks';

const CONFIDENCE_PROGRESS_SIZE = '85px';
const CONFIDENCE_PROGRESS_THICKNESS = 4.5;

type ConfidenceWidgetProps = {
  confidence: number;
};

const ConfidenceWidget = (props: ConfidenceWidgetProps) => {
  const { confidence } = props;

  const { text: confidenceText, color: confidenceColor } =
    useConfidenceDescriptors(confidence);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.progressWrapper}>
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{ color: confidenceColor.light }}
          size={CONFIDENCE_PROGRESS_SIZE}
          thickness={CONFIDENCE_PROGRESS_THICKNESS}
        />
        <CircularProgress
          variant="determinate"
          value={confidence * 100}
          sx={{ ...styles.progressValueTrack, color: confidenceColor.dark }}
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
        <Typography fontWeight={600}>{confidenceText.title}</Typography>
        <Typography variant="caption">{confidenceText.description}</Typography>
      </Stack>
    </Box>
  );
};

export { ConfidenceWidget };
