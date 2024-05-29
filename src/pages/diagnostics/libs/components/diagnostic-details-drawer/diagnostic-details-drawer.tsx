import { Dialog } from '@/libs/components';
import { NavigateBeforeRounded } from '@mui/icons-material';
import {
  Box,
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
      open
      anchor="right"
      PaperProps={{ square: false }}
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
          Діагностування меланоми
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
            <Typography
              component="div"
              variant="caption"
              fontSize={14}
              textAlign="right"
            >
              Total models:{' '}
              <Box component="span" fontWeight={600}>
                {models.length}
              </Box>
            </Typography>
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
