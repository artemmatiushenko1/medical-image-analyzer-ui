import {
  CheckCircleRounded,
  KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Box, Button, Paper, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { useNewStudyStore } from '@/pages/new-study/store';
import { ValueOf } from '@/libs/types';
import { NewStudyCreationStep } from '../../libs/enums';

type BottomNavigationProps = {
  activeStep: ValueOf<typeof NewStudyCreationStep>;
  isFinalStep: boolean;

  onPreviousStep: () => void;
  onNextStep: () => void;
};

const BottomNavigation = (props: BottomNavigationProps) => {
  const { onPreviousStep, onNextStep, activeStep, isFinalStep } = props;

  const { t } = useTranslation('NewStudy');

  const { t: tCommon } = useTranslation('Common');

  const hasSelectedDiagnostics = useNewStudyStore(
    (state) => state.selectedDianosticIds.length > 0,
  );

  const hasUploadedImage = useNewStudyStore((state) =>
    Boolean(state.uploadedImageSrc),
  );

  const nextButtonDisabledByStep: Record<
    ValueOf<typeof NewStudyCreationStep>,
    {
      disabled: boolean;
      tooltip: string;
    } | null
  > = {
    [NewStudyCreationStep.CHOOSE_DIAGNOSTICS]: {
      disabled: !hasSelectedDiagnostics,
      tooltip: t('ValidationsMessage.ChooseDiagnostics'),
    },
    [NewStudyCreationStep.UPLOAD_IMAGE]: {
      disabled: !hasUploadedImage,
      tooltip: t('ValidationsMessage.UploadImage'),
    },
    [NewStudyCreationStep.CONFIRM]: null,
  };

  const { disabled: nextButtonDisabled, tooltip: nextButtonTooltip } =
    nextButtonDisabledByStep[activeStep] ?? {};

  return (
    <Paper sx={styles.root}>
      <Box gap={1} display="flex" alignItems="center">
        <Button
          variant="text"
          color="inherit"
          onClick={onPreviousStep}
          disabled={activeStep <= 0}
          startIcon={<KeyboardBackspaceRounded />}
        >
          {tCommon('Back')}
        </Button>
        <Button variant="text" color="error">
          {tCommon('Cancel')}
        </Button>
      </Box>
      <Tooltip title={nextButtonDisabled && nextButtonTooltip}>
        <span>
          <Button
            variant="contained"
            onClick={onNextStep}
            disabled={nextButtonDisabled}
            color={isFinalStep ? 'success' : 'primary'}
            startIcon={isFinalStep && <CheckCircleRounded />}
          >
            {isFinalStep ? t('CreateStudy') : tCommon('Next')}
          </Button>
        </span>
      </Tooltip>
    </Paper>
  );
};

export { BottomNavigation };
