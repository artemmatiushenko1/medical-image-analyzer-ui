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

const DiagnosticDetailDrawer = () => {
  const models = [
    { name: 'CoviScanNet', id: '1' },
    { name: 'SARS-CoV-2Analyzer', id: '2' },
    { name: 'CovidVisionAI', id: '3' },
  ];

  return (
    <Drawer
      open
      anchor="right"
      sx={{
        width: '600px',
        '& > .MuiPaper-root': { width: '600px', borderTop: 'none' },
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
        <Dialog.Title lineHeight={2.6}>Дігностування меланоми</Dialog.Title>
      </Stack>
      <Divider />
      <Dialog.Content sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography
              fontSize="14px"
              fontWeight={600}
              sx={{ color: ({ palette }) => palette.neutral.dark }}
            >
              AI Models
            </Typography>
            <Typography variant="caption">List of models</Typography>
          </Stack>
          <Button
            startIcon={
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
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
          >
            Upload new model
          </Button>
        </Stack>
        <Stack spacing={2}>
          {models.map((model) => (
            <ModelCard name={model.name} key={model.id} />
          ))}
        </Stack>
      </Dialog.Content>
    </Drawer>
  );
};

export { DiagnosticDetailDrawer };
