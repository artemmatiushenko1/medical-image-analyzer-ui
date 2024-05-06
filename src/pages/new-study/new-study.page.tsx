import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { BottomNavigation } from './libs/components/bottom-navigation';
import { useEffect, useMemo, useState } from 'react';
import { NewStudyCreationStep } from './libs/enums';
import { styles } from './styles';
import {
  ChooseDiagnostics,
  ImageUpload,
  StudySummary,
  StudyInfoForm,
  CreateStudyStatusDialog,
} from './libs/components';
import { useTranslation } from 'react-i18next';
import { ValueOf } from '@/libs/types';
import { useNewStudyStore } from './new-study.store';

const NewStudy = () => {
  const { t } = useTranslation('NewStudy');

  const createStudyStatusDialogOpen = useNewStudyStore(
    (state) => state.createStudyStatusDialogOpen,
  );

  const setCreateStudyStatusDialogOpen = useNewStudyStore(
    (state) => state.setCreateStudyStatusDialogOpen,
  );

  const resetNewStudyStore = useNewStudyStore((state) => state.reset);

  const [activeStepIndex, setActiveStepIndex] = useState<
    ValueOf<typeof NewStudyCreationStep>
  >(NewStudyCreationStep.UPLOAD_IMAGE);

  useEffect(() => resetNewStudyStore, [resetNewStudyStore]);

  const steps = useMemo(
    () => [
      {
        key: NewStudyCreationStep.UPLOAD_IMAGE,
        title: t('SubmissionSteps.UploadImage'),
        component: (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 12,
              alignSelf: 'center',
            }}
          >
            <ImageUpload />
            <StudyInfoForm />
          </Box>
        ),
      },
      {
        key: NewStudyCreationStep.CHOOSE_DIAGNOSTICS,
        title: t('SubmissionSteps.ChooseDiagnostics'),
        component: <ChooseDiagnostics />,
      },
      {
        key: NewStudyCreationStep.CONFIRM,
        title: t('SubmissionSteps.CreateStudy'),
        component: <StudySummary />,
      },
    ],
    [t],
  );

  const isOnFinalStep = activeStepIndex === steps.length - 1;

  const handleNextStep = () => {
    if (isOnFinalStep) {
      setCreateStudyStatusDialogOpen(true);
      return;
    }

    setActiveStepIndex(
      (prevActiveStep) =>
        (prevActiveStep + 1) as ValueOf<typeof NewStudyCreationStep>,
    );
  };

  const handlePreviousStep = () => {
    setActiveStepIndex(
      (prevActiveStep) =>
        (prevActiveStep - 1) as ValueOf<typeof NewStudyCreationStep>,
    );
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
          {steps.map(({ key, title }, index) => (
            <Step key={key}>
              <StepLabel>
                <Typography variant="caption">Step {index + 1}</Typography>
                <Typography variant="subtitle2">{title}</Typography>
              </StepLabel>
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
      {createStudyStatusDialogOpen && <CreateStudyStatusDialog />}
    </Stack>
  );
};

export { NewStudy };
