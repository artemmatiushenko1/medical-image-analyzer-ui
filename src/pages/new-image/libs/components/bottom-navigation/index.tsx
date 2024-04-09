import {
  CheckCircleRounded,
  KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

type BottomNavigationProps = {
  activeStep: number;
  stepsCount: number;

  onPreviousStep: () => void;
  onNextStep: () => void;
};

const BottomNavigation = (props: BottomNavigationProps) => {
  const { onPreviousStep, onNextStep, activeStep, stepsCount } = props;

  const { t } = useTranslation('common');

  const isFinalStep = stepsCount === activeStep;

  return (
    <Stack direction="row" width="100%" justifyContent="space-between">
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
      <Button
        variant="contained"
        onClick={onNextStep}
        color={isFinalStep ? 'success' : 'primary'}
        startIcon={isFinalStep && <CheckCircleRounded />}
      >
        {isFinalStep ? t('Finish') : t('Next')}
      </Button>
    </Stack>
  );
};

export { BottomNavigation };
