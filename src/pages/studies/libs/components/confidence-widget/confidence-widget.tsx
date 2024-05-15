import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { toPercentString } from '@/libs/helpers';
import { ConfidenceThreshold } from '../../enums';
import { cinnabar, emerald, amber } from '@/libs/theme/colors';
import { getConfidenceThreshold } from '../../helpers';

const CONFIDENCE_PROGRESS_SIZE = '85px';
const CONFIDENCE_PROGRESS_THICKNESS = 4.5;

type ConfidenceWidgetProps = {
  confidence: number;
};

const ConfidenceWidget = (props: ConfidenceWidgetProps) => {
  const { confidence } = props;

  const colorByConfidenceThreshold = {
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

  const textByConfidenceThreshold = {
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
        "There's a high risk of a disease been studied. Please contact a doctor as soon as possible for a furher examination.",
    },
  };

  const confidenceThreshold = getConfidenceThreshold(confidence);
  const colors = colorByConfidenceThreshold[confidenceThreshold];
  const text = textByConfidenceThreshold[confidenceThreshold];

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
