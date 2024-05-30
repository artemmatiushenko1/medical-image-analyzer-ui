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
import { ModelUpload } from '../model-upload';
import { ModelsList } from '../models-list';
import { useState } from 'react';
import { DiagnosticDrawerStage } from '../../enums';
import { ValueOf } from '@/libs/types';

type DiagnosticDetailsDrawer = {
  open: boolean;
  onClose: () => void;
  onCloseFinished: () => void;
  diagnostic: Diagnostic | null;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, diagnostic, onCloseFinished } = props;

  const [stagesStack, setStagesStack] = useState<
    ValueOf<typeof DiagnosticDrawerStage>[]
  >([DiagnosticDrawerStage.DIAGNOSTIC_DETAILS]);

  const currentStage = stagesStack.at(-1);

  const stageToDetailsMap: {
    [key in ValueOf<typeof DiagnosticDrawerStage>]: {
      component: React.ReactNode;
      title: string;
    } | null;
  } = {
    [DiagnosticDrawerStage.DIAGNOSTIC_DETAILS]: {
      title: diagnostic?.name ?? '',
      component: diagnostic && (
        <ModelsList
          diagnosticId={diagnostic.id}
          onUploadNewModelClick={() =>
            navigateToStage(DiagnosticDrawerStage.UPLOAD_MODEL)
          }
        />
      ),
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL]: {
      title: 'Upload a new model',
      component: <ModelUpload />,
    },
    [DiagnosticDrawerStage.UPLOAD_MODEL_VERSION]: null,
    [DiagnosticDrawerStage.MODEL_DETAILS]: null,
  };

  const handleNavigateBackClick = () => {
    if (stagesStack.length === 1) {
      onClose();
      return;
    }

    setStagesStack((prevState) => [
      ...prevState.slice(0, prevState.length - 1),
    ]);
  };

  const navigateToStage = (stage: ValueOf<typeof DiagnosticDrawerStage>) => {
    setStagesStack((prevState) => [...prevState, stage]);
  };

  const currentStageDetails = currentStage
    ? stageToDetailsMap[currentStage]
    : null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{ square: false }}
      onTransitionExited={onCloseFinished}
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
