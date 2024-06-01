import {
  Box,
  Divider,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { BottomNavigation } from './components/bottom-navigation';
import { useEffect, useMemo, useState } from 'react';
import { NewStudyCreationStep } from './libs/enums';
import { styles } from './styles';
import {
  ChooseDiagnostics,
  ImageUpload,
  StudySummary,
  CreateStudyStatusDialog,
} from './components';
import { useTranslation } from 'react-i18next';
import { ValueOf } from '@/libs/types';
import { useNewStudyStore } from './store';

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
          <Box sx={styles.imageUploadWrapper}>
            <ImageUpload />
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

  const stepsMeta = {
    [NewStudyCreationStep.UPLOAD_IMAGE]: {
      title: t('Instructions.UploadAnImage.Title'),
      description: t('Instructions.UploadAnImage.Caption'),
    },
    [NewStudyCreationStep.CHOOSE_DIAGNOSTICS]: {
      title: t('Instructions.ChooseDiagnostics.Title'),
      description: t('Instructions.ChooseDiagnostics.Caption'),
    },
    [NewStudyCreationStep.CONFIRM]: {
      title: t('Instructions.StudyOverview.Title'),
      description: t('Instructions.StudyOverview.Caption'),
    },
  };

  const stepMeta = stepsMeta[activeStepIndex];

  return (
    <Box sx={styles.root}>
      <Paper square sx={styles.sidebar}>
        <Stack sx={styles.sidebarHeader}>
          <Typography variant="h6" sx={{ fontSize: '18px' }} fontWeight={600}>
            {t('PageTitle')}
          </Typography>
          <Typography variant="caption">{t('PageDescription')}</Typography>
        </Stack>
        <Divider />
        <Stepper
          sx={styles.stepper}
          orientation="vertical"
          activeStep={activeStepIndex}
        >
          {steps.map(({ key, title }, index) => (
            <Step key={key}>
              <StepLabel>
                <Typography variant="caption">
                  {t('Step')} {index + 1}
                </Typography>
                <Typography variant="subtitle2">{title}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <Stack sx={styles.main}>
        <Paper square sx={styles.stepHeader}>
          <Typography variant="subtitle2">{stepMeta.title}</Typography>
          <Typography variant="caption">{stepMeta.description}</Typography>
        </Paper>
        <Box sx={styles.stepBody}>{steps.at(activeStepIndex)?.component}</Box>
        <BottomNavigation
          activeStep={activeStepIndex}
          isFinalStep={isOnFinalStep}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      </Stack>
      {createStudyStatusDialogOpen && <CreateStudyStatusDialog />}
    </Box>
  );
};

export { NewStudy };
