import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { BottomNavigation } from './libs/components/bottom-navigation';
import { useState } from 'react';
import { NewStudyCreationStep } from './libs/enums';
import { styles } from './styles';
import i18n from '@/libs/i18n';
import { ChooseDiagnostics, ImageUpload } from './libs/components';
import { StudyInfoForm } from './libs/components/study-info-form/study-info-form';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    key: NewStudyCreationStep.UPLOAD_IMAGE,
    title: i18n.t('NewStudy:SubmissionSteps.UploadImage'),
    component: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: 12,
        }}
      >
        <ImageUpload />
        <StudyInfoForm />
      </Box>
    ),
  },
  {
    key: NewStudyCreationStep.CHOOSE_DIAGNOSTICS,
    title: i18n.t('NewStudy:SubmissionSteps.ChooseDiagnostics'),
    component: <ChooseDiagnostics />,
  },
  {
    key: NewStudyCreationStep.CONFIRM,
    title: i18n.t('NewStudy:SubmissionSteps.Confirm'),
    component: <div>Confirm</div>,
  },
];

const NewStudy = () => {
  const { t } = useTranslation('NewStudy');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const isOnFinalStep = activeStepIndex === steps.length - 1;

  const handleNextStep = () => {
    if (isOnFinalStep) {
      // TODO: handle form submission
      return;
    }

    setActiveStepIndex((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStepIndex((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack sx={styles.root}>
      <Box sx={styles.header}>
        <Stack sx={{ flex: '40%' }}>
          <Typography variant="h6" fontWeight={600}>
            {t('PageTitle')}
          </Typography>
          <Typography variant="caption">{t('PageDescription')}</Typography>
        </Stack>
        <Stepper sx={{ flex: '60%' }} activeStep={activeStepIndex}>
          {steps.map(({ key, title }) => (
            <Step key={key}>
              <StepLabel>{title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={styles.stepBody}>{steps.at(activeStepIndex)?.component}</Box>
      <BottomNavigation
        activeStep={activeStepIndex}
        isFinalStep={isOnFinalStep}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
    </Stack>
  );
};

export { NewStudy };
