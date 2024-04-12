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
import { NewImageSubmissionStep } from './libs/enums/new-image-submission-step.enum';
import { styles } from './styles';
import i18n from '@/libs/i18n';
import { ImageUpload } from './libs/components/image-upload';

const steps = [
  {
    key: NewImageSubmissionStep.UPLOAD_IMAGE,
    title: i18n.t('NewImage:SubmissionSteps.UploadImage'),
    component: <ImageUpload />,
  },
  {
    key: NewImageSubmissionStep.CHOOSE_DIAGNOSTICS,
    title: i18n.t('NewImage:SubmissionSteps.ChooseDiagnostics'),
    component: <div>Choose diagnostics</div>,
  },
  {
    key: NewImageSubmissionStep.CONFIRM,
    title: i18n.t('NewImage:SubmissionSteps.Confirm'),
    component: <div>Confirm</div>,
  },
];

const NewImage = () => {
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
        <Stack sx={{ flex: '50%' }}>
          <Typography variant="h6" fontWeight={600}>
            New image analysis
          </Typography>
          <Typography variant="caption">
            Follow the following steps to submit an image for analysis
          </Typography>
        </Stack>
        <Stepper sx={{ flex: '50%' }} activeStep={activeStepIndex}>
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

export { NewImage };
