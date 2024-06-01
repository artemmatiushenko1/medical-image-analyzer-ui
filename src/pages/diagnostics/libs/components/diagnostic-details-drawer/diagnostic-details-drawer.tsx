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
import { Diagnostic } from '@/packages/diagnostics';
import { ModelDetails, ModelUpload, ModelsList } from './components';
import { DiagnosticDrawerStage } from './enums';
import { ValueOf } from '@/libs/types';
import { useDiagnosticDrawerStore } from './store';

type DiagnosticDetailsDrawer = {
  open: boolean;
  diagnostic: Diagnostic | null;

  onClose: () => void;
  onCloseFinished: () => void;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, diagnostic, onCloseFinished } = props;

  const selectedModel = useDiagnosticDrawerStore(
    (state) => state.selectedModel,
  );
  const stagesStack = useDiagnosticDrawerStore((state) => state.stagesStack);

  const navigateToPreviousStage = useDiagnosticDrawerStore(
    (state) => state.navigateToPreviousStage,
  );
  const resetStages = useDiagnosticDrawerStore((state) => state.resetStages);

  const stageToDetailsMap: {
    [key in ValueOf<typeof DiagnosticDrawerStage>]: {
      component: React.ReactNode;
      title: string;
    } | null;
  } = {
    [DiagnosticDrawerStage.ROOT]: {
      title: diagnostic?.name ?? '',
      component: diagnostic && <ModelsList diagnosticId={diagnostic.id} />,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL]: {
      title: 'New model',
      component: diagnostic ? (
        <ModelUpload diagnosticId={diagnostic?.id} />
      ) : null,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL_VERSION]: {
      component: <div>Upload new model version</div>,
      title: 'New model version',
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
        <Tooltip title="Back">
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
        <Dialog.Title lineHeight={2.6} fontSize={18} component="div">
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
