import {
  CheckCircleRounded,
  KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Box, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { NewStudyCreationStep } from '../../enums';
import { useNewStudyStore } from '@/pages/new-study/new-study.store';
import { ValueOf } from '@/libs/types';

type BottomNavigationProps = {
  activeStep: ValueOf<typeof NewStudyCreationStep>;
  isFinalStep: boolean;

  onPreviousStep: () => void;
  onNextStep: () => void;
};

const BottomNavigation = (props: BottomNavigationProps) => {
  const { onPreviousStep, onNextStep, activeStep, isFinalStep } = props;

  const { t } = useTranslation('Common');

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
      tooltip:
        'Please choose at least one diagnostic to proceed with the next step.',
    },
    [NewStudyCreationStep.UPLOAD_IMAGE]: {
      disabled: !hasUploadedImage,
      tooltip: 'Please upload an image to proceed with the next step.',
    },
    [NewStudyCreationStep.CONFIRM]: null,
  };

  const { disabled: nextButtonDisabled, tooltip: nextButtonTooltip } =
    nextButtonDisabledByStep[activeStep] ?? {};

  return (
    <Box sx={styles.root}>
      <Box gap={1} display="flex" alignItems="center">
        <Button
          variant="text"
          color="inherit"
          onClick={onPreviousStep}
          disabled={activeStep <= 0}
          startIcon={<KeyboardBackspaceRounded />}
        >
          {t('Back')}
        </Button>
        <Button variant="text" color="error">
          {t('Cancel')}
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
            {isFinalStep ? 'Create study' : t('Next')}
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
};

export { BottomNavigation };
