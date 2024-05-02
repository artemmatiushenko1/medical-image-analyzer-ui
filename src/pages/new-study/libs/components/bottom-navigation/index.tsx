import {
  CheckCircleRounded,
  KeyboardBackspaceRounded,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

type BottomNavigationProps = {
  activeStep: number;
  isFinalStep: boolean;

  onPreviousStep: () => void;
  onNextStep: () => void;
};

const BottomNavigation = (props: BottomNavigationProps) => {
  const { onPreviousStep, onNextStep, activeStep, isFinalStep } = props;

  const { t } = useTranslation('Common');

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
      <Button
        variant="contained"
        onClick={onNextStep}
        color={isFinalStep ? 'success' : 'primary'}
        startIcon={isFinalStep && <CheckCircleRounded />}
      >
        {isFinalStep ? t('Create') : t('Next')}
      </Button>
    </Box>
  );
};

export { BottomNavigation };
