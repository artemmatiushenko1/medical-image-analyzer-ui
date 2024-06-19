import {
  Box,
  Divider,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { BottomNavigation } from './components/bottom-navigation';
import { useEffect, useState } from 'react';
import { NewStudyCreationStep } from './libs/enums';
import { styles } from './styles';
import {
  ChooseDiagnostics,
  ImageUpload,
  StudySummary,
  CreateStudyStatusDialog,
  ChooseModels,
} from './components';
import { useTranslation } from 'react-i18next';
import { ValueOf } from '@/libs/types';
import { useNewStudyStore } from './store';
import { useCreateStudy, useGetAvailableModels } from './libs/queries';
import { SplashScreen } from '@/libs/components';

const NewStudy = () => {
  const { t } = useTranslation('NewStudy');

  const createStudyStatusDialogOpen = useNewStudyStore(
    (state) => state.createStudyStatusDialogOpen,
  );

  const setCreateStudyStatusDialogOpen = useNewStudyStore(
    (state) => state.setCreateStudyStatusDialogOpen,
  );

  const resetNewStudyStore = useNewStudyStore((state) => state.reset);

  const getCreateStudyPayload = useNewStudyStore(
    (state) => state.getCreateStudyPayload,
  );

  const {
    isPending: isCreateStudyPending,
    isSuccess: isCreateStudySuccess,
    mutate: createStudy,
  } = useCreateStudy();

  const [activeStepIndex, setActiveStepIndex] = useState<
    ValueOf<typeof NewStudyCreationStep>
  >(NewStudyCreationStep.UPLOAD_IMAGE);

  const {
    diagnostics,
    modelsByDiagnosticId,
    diagnosticById,
    modelsById,
    isLoading,
  } = useGetAvailableModels();

  const isDownToMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  useEffect(() => resetNewStudyStore, [resetNewStudyStore]);

  const steps = [
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
      component: <ChooseDiagnostics diagnostics={diagnostics} />,
    },
    {
      key: NewStudyCreationStep.CHOOSE_MODELS,
      title: t('SubmissionSteps.ChooseModels'),
      component: (
        <ChooseModels
          modelsByDiagnosticId={modelsByDiagnosticId}
          diagnosticsById={diagnosticById}
        />
      ),
    },
    {
      key: NewStudyCreationStep.CONFIRM,
      title: t('SubmissionSteps.CreateStudy'),
      component: (
        <StudySummary
          diagnosticsById={diagnosticById}
          modelsById={modelsById}
        />
      ),
    },
  ];

  const isOnFinalStep = activeStepIndex === steps.length - 1;

  const handleNextStep = () => {
    if (isOnFinalStep) {
      setCreateStudyStatusDialogOpen(true);
      createStudy(getCreateStudyPayload());
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
    [NewStudyCreationStep.CHOOSE_MODELS]: {
      title: t('Instructions.ChooseModels.Title'),
      description: t('Instructions.ChooseModels.Caption'),
    },
    [NewStudyCreationStep.CONFIRM]: {
      title: t('Instructions.StudyOverview.Title'),
      description: t('Instructions.StudyOverview.Caption'),
    },
  };

  const stepMeta = stepsMeta[activeStepIndex];

  if (isLoading) return <SplashScreen />;

  return (
    <Box sx={styles.root}>
      {isDownToMediumScreen && (
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
      )}
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
      {createStudyStatusDialogOpen && (
        <CreateStudyStatusDialog
          isLoading={isCreateStudyPending}
          isSuccess={isCreateStudySuccess}
        />
      )}
    </Box>
  );
};

export { NewStudy };
