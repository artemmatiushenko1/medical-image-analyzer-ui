import { SuccessCheckmark } from '@/libs/components';
import { Button, Stack, Typography } from '@mui/material';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';

const ModelUploadSuccessBanner = () => {
  const { navigateUntilStage } = useDiagnosticsStore();

  const handleOkClick = () => {
    navigateUntilStage(DiagnosticDrawerStage.ROOT);
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={3}
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        background: ({ palette }) => palette.background.paper,
      }}
    >
      <SuccessCheckmark />
      <Stack>
        <Typography variant="h6" fontSize={16} textAlign="center" gutterBottom>
          New model was successfully uploaded!
        </Typography>
        <Typography variant="caption" textAlign="center">
          You can now manage it through <br />
          diagnostic details view.
        </Typography>
      </Stack>
      <Button size="small" variant="outlined" onClick={handleOkClick}>
        Ok
      </Button>
    </Stack>
  );
};

export { ModelUploadSuccessBanner };
