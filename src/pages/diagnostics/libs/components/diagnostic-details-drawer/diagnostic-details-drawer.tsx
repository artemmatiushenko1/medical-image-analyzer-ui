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
import { ModelUpload, ModelsList } from './components';
import { DiagnosticDrawerStage } from './enums';
import { ValueOf } from '@/libs/types';
import { useDiagnosticDrawerStagesStore } from './store';

type DiagnosticDetailsDrawer = {
  open: boolean;
  diagnostic: Diagnostic | null;

  onClose: () => void;
  onCloseFinished: () => void;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, diagnostic, onCloseFinished } = props;

  const stagesStack = useDiagnosticDrawerStagesStore(
    (state) => state.stagesStack,
  );
  const navigateNext = useDiagnosticDrawerStagesStore(
    (state) => state.navigateNext,
  );
  const navigateBack = useDiagnosticDrawerStagesStore(
    (state) => state.navigateBack,
  );
  const resetStages = useDiagnosticDrawerStagesStore((state) => state.reset);

  const stageToDetailsMap: {
    [key in ValueOf<typeof DiagnosticDrawerStage>]: {
      component: React.ReactNode;
      title: string;
    } | null;
  } = {
    [DiagnosticDrawerStage.ROOT]: {
      title: diagnostic?.name ?? '',
      component: diagnostic && (
        <ModelsList
          diagnosticId={diagnostic.id}
          onUploadNewModelClick={() =>
            navigateNext(DiagnosticDrawerStage.UPLOAD_MODEL)
          }
        />
      ),
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL]: {
      title: 'Upload a new model',
      component: diagnostic ? (
        <ModelUpload diagnosticId={diagnostic?.id} />
      ) : null,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL_VERSION]: null,
    [DiagnosticDrawerStage.MODEL_DETAILS]: null,
  };

  const handleDrawerCloseFinished = () => {
    resetStages();
    onCloseFinished();
  };

  const handleNavigateBackClick = () => {
    navigateBack(onClose);
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
            onClick={handleNavigateBackClick}
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
