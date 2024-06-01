import { Breadcrumbs, Dialog } from '@/libs/components';
import { NavigateBeforeRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { ModelDetails, ModelUpload, ModelsList } from './components';
import { ValueOf } from '@/libs/types';
import { VersionUpload } from './components/version-upload';
import { useDiagnosticsStore } from '../../store';
import { DiagnosticDrawerStage } from '../../libs/enums';
import { useTranslation } from 'react-i18next';

type DiagnosticDetailsDrawer = {
  open: boolean;

  onClose: () => void;
  onCloseFinished: () => void;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, onCloseFinished } = props;

  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages',
  });
  const { t: tCommon } = useTranslation('Common');

  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );
  const selectedModel = useDiagnosticsStore((state) => state.selectedModel);
  const stagesStack = useDiagnosticsStore((state) => state.stagesStack);

  const navigateToPreviousStage = useDiagnosticsStore(
    (state) => state.navigateToPreviousStage,
  );
  const resetStages = useDiagnosticsStore((state) => state.resetStages);

  const stageToDetailsMap: {
    [key in ValueOf<typeof DiagnosticDrawerStage>]: {
      component: React.ReactNode;
      title: string;
    } | null;
  } = {
    [DiagnosticDrawerStage.ROOT]: {
      title: selectedDiagnostic?.name ?? '',
      component: selectedDiagnostic && <ModelsList />,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL]: {
      title: t('NewModel.Title'),
      component: selectedDiagnostic ? <ModelUpload /> : null,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL_VERSION]: {
      component: <VersionUpload />,
      title: t('NewVersion.Title'),
    },
    [DiagnosticDrawerStage.MODEL_DETAILS]: {
      component: <ModelDetails />,
      title: selectedModel?.name ?? '',
    },
  };

  const handleDrawerCloseFinished = () => {
    resetStages();
    onCloseFinished();
  };

  const handlenavigateToPreviousStageClick = () => {
    navigateToPreviousStage(onClose);
  };

  const currentStage = stagesStack.at(-1);

  const currentStageDetails = currentStage
    ? stageToDetailsMap[currentStage]
    : null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{ square: false }}
      onTransitionExited={handleDrawerCloseFinished}
      sx={{
        width: '600px',
        '& > .MuiPaper-root': {
          width: '600px',
          borderTop: 'none',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <Stack direction="row">
        <Tooltip title={tCommon('Back')}>
          <IconButton
            onClick={handlenavigateToPreviousStageClick}
            sx={{
              color: ({ palette }) => palette.neutral.dark,
              alignSelf: 'center',
              margin: '16px 0 16px 24px',
            }}
          >
            <NavigateBeforeRounded />
          </IconButton>
        </Tooltip>
        <Dialog.Title
          lineHeight={2.6}
          fontSize={18}
          component="div"
          noWrap
          maxWidth={500}
        >
          {currentStageDetails?.title}
        </Dialog.Title>
      </Stack>
      <Divider />
      {stagesStack.length > 1 && (
        <Box sx={{ padding: '15px 24px' }}>
          <Breadcrumbs
            segments={stagesStack.map(
              (stage) => stageToDetailsMap[stage]?.title ?? '',
            )}
          />
        </Box>
      )}
      {currentStageDetails && currentStageDetails.component}
    </Drawer>
  );
};

export { DiagnosticDetailDrawer };
