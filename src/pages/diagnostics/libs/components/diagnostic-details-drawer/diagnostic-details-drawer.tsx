import { Dialog } from '@/libs/components';
import { NavigateBeforeRounded } from '@mui/icons-material';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ModelCard } from '../model-card';
import { Diagnostic } from '@/packages/diagnostics';

type DiagnosticDetailsDrawer = {
  open: boolean;
  onClose: () => void;
  onCloseFinished: () => void;
  diagnostic: Diagnostic | null;
};

const DiagnosticDetailDrawer = (props: DiagnosticDetailsDrawer) => {
  const { open, onClose, diagnostic, onCloseFinished } = props;

  const models = [
    { name: 'CoviScanNet', id: '1', version: '1' },
    { name: 'SARS-CoV-2Analyzer', id: '2', version: '2' },
    { name: 'CovidVisionAI', id: '3', version: '1' },
    { name: 'CoviScanNet', id: '1', version: '1' },
    { name: 'SARS-CoV-2Analyzer', id: '2', version: '2' },
    { name: 'CovidVisionAI', id: '3', version: '1' },
    { name: 'CoviScanNet', id: '1', version: '1' },
    { name: 'SARS-CoV-2Analyzer', id: '2', version: '2' },
    { name: 'CovidVisionAI', id: '3', version: '1' },
  ];

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
      <Dialog.Content sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="end">
          <Button
            startIcon={
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m16 16-4-4-4 4"></path>
              </svg>
            }
            variant="contained"
            fullWidth
          >
            Upload new model
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography fontSize="14px" variant="subtitle2">
                Models
              </Typography>
              <Typography variant="caption">
                View and manage related AI models
              </Typography>
            </Stack>
          </Stack>
          {models.map((model) => (
            <ModelCard
              name={model.name}
              key={model.id}
              version={model.version}
            />
          ))}
        </Stack>
      </Dialog.Content>
    </Drawer>
  );
};

export { DiagnosticDetailDrawer };
