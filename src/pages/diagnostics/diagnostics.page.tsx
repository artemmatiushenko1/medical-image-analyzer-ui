import { Breadcrumbs } from '@/libs/components';
import { AddRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useClosable } from '@/libs/hooks';
import {
  DiagnosticDetailDrawer,
  DiagnosticsTable,
  NewDiagnosticDialog,
} from './components';
import { Diagnostic, useGetAllDiagnostics } from '@/packages/diagnostics';
import { GridRowParams } from '@mui/x-data-grid';
import { useDiagnosticsStore } from './store';
import { useTranslation } from 'react-i18next';

const Diagnostics = () => {
  const { t } = useTranslation('Diagnostics');

  const breadcrumbs = [t('Breadcrumbs.Home'), t('Breadcrumbs.Diagnostics')];

  const setSelectedDiagnostic = useDiagnosticsStore(
    (state) => state.setSelectedDiagnostic,
  );
  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );

  const {
    isOpen: isNewDiagnosticDialogOpen,
    close: closeNewDiagnosticDialog,
    open: openNewDiagnosticDialog,
  } = useClosable();

  const { isOpen: isDiagnosticDrawerOpen, close: closeDiagnosticDrawer } =
    useClosable(!!selectedDiagnostic);

  const { isLoading, data: diagnostics = [] } = useGetAllDiagnostics();

  const handleRowClick = (data: GridRowParams<Diagnostic>) => {
    setSelectedDiagnostic(data.row);
  };

  const handleDiagnosticDrawerCloseFinished = () => {
    setSelectedDiagnostic(null);
  };

  return (
    <Stack sx={styles.root} direction="row">
      <Stack sx={styles.contentWrapper}>
        <Breadcrumbs segments={breadcrumbs} />
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flex: 0.6 }}>
            <Typography variant="h6" fontWeight={600}>
              {t('PageTitle')}
            </Typography>
            <Typography variant="caption">{t('PageDescription')}</Typography>
          </Box>
          <Box>
            <Button
              startIcon={<AddRounded />}
              variant="contained"
              onClick={openNewDiagnosticDialog}
            >
              {t('NewDiagnosticButton')}
            </Button>
          </Box>
        </Stack>
        <DiagnosticsTable
          loading={isLoading}
          rows={diagnostics}
          onRowClick={handleRowClick}
        />
      </Stack>
      <NewDiagnosticDialog
        open={isNewDiagnosticDialogOpen}
        onClose={closeNewDiagnosticDialog}
      />
      <DiagnosticDetailDrawer
        open={isDiagnosticDrawerOpen}
        onClose={closeDiagnosticDrawer}
        onCloseFinished={handleDiagnosticDrawerCloseFinished}
      />
    </Stack>
  );
};

export { Diagnostics };
