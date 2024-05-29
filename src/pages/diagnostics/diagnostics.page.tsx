import { Breadcrumbs } from '@/libs/components';
import { AddRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useClosable } from '@/libs/hooks';
import { DiagnosticsTable, NewDiagnosticDialog } from './libs/components';

const Diagnostics = () => {
  const breadcrumbs = ['Home', 'Diagnostics'];

  const {
    isOpen: isNewDiagnosticDialogOpen,
    close: closeNewDiagnosticDialog,
    open: openNewDiagnosticDialog,
  } = useClosable();

  return (
    <Stack sx={styles.root} direction="row">
      <Stack
        sx={{
          ...styles.contentWrapper,
          // marginRight: drawerOpen ? 0 : `-${ADD_USER_DRAWER_WIDTH_PX}px`,
        }}
      >
        <Breadcrumbs segments={breadcrumbs} />
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flex: 0.6 }}>
            <Typography variant="h6" fontWeight={600}>
              Diagnostics management
            </Typography>
            <Typography variant="caption">
              View and manage diagnostics with corresponding AI models for
              disease diagnosis.
            </Typography>
          </Box>
          <Box>
            <Button
              startIcon={<AddRounded />}
              variant="contained"
              onClick={openNewDiagnosticDialog}
            >
              New diagnostic
            </Button>
          </Box>
        </Stack>
        <DiagnosticsTable rows={[{ id: 1, name: 'Melanoma detection' }]} />
      </Stack>
      <NewDiagnosticDialog
        open={isNewDiagnosticDialogOpen}
        onClose={closeNewDiagnosticDialog}
      />
    </Stack>
  );
};

export { Diagnostics };
