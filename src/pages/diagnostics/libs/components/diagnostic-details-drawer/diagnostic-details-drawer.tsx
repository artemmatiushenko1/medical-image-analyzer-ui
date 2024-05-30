import { Dialog } from '@/libs/components';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { Divider, Drawer, IconButton, Stack } from '@mui/material';
import { Diagnostic } from '@/packages/diagnostics';
import { ModelUpload } from '../model-upload';
import { ModelsList } from '../models-list';

type DiagnosticDetailsDrawer = {
  open: boolean;
  onClose: () => void;
  onCloseFinished: () => void;
  diagnostic: Diagnostic | null;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, diagnostic, onCloseFinished } = props;

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
        <IconButton
          sx={{
            color: ({ palette }) => palette.neutral.dark,
            alignSelf: 'center',
            margin: '16px 0 16px 24px',
          }}
        >
          <NavigateBeforeRounded />
        </IconButton>
        <Dialog.Title lineHeight={2.6} fontSize={18}>
          {diagnostic?.name}
        </Dialog.Title>
      </Stack>
      <Divider />
      {diagnostic && <ModelsList diagnosticId={diagnostic.id} />}
      {/* <ModelUpload /> */}
    </Drawer>
  );
};

export { DiagnosticDetailDrawer };
