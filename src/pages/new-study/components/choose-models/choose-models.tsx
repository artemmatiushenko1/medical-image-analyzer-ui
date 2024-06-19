import { Box, Stack } from '@mui/material';
import { SelectedDiagnosticAccordion } from './selected-diagnostic-accordion';
import { useNewStudyStore } from '../../store';
import { Diagnostic, Model } from '@/packages/diagnostics';
import { styles } from './styles';

type ChooseModelsProps = {
  modelsByDiagnosticId: Record<string, Model[]>;
  diagnosticsById: Record<string, Diagnostic>;
};

const ChooseModels = (props: ChooseModelsProps) => {
  const { modelsByDiagnosticId, diagnosticsById } = props;

  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );
  const updateSelectedDiagnostictIds = useNewStudyStore(
    (state) => state.updateSelectedDiagnostictIds,
  );

  const selectedDiagnostics = selectedDiagnosticIds.map(
    (id) => diagnosticsById[id],
  );

  const removeSelectedDiagnostic = (idToRemove: string) => {
    updateSelectedDiagnostictIds(idToRemove);
  };

  return (
    <Stack sx={{ mt: 4, maxWidth: '500px', width: '100%' }}>
      {selectedDiagnosticIds.length > 0 && (
        <Stack sx={styles.root}>
          <Box sx={{ marginTop: '20px', overflowY: 'scroll', pb: 2 }}>
            {selectedDiagnostics.map(({ id, name }) => (
              <SelectedDiagnosticAccordion
                key={id}
                id={id}
                title={name}
                diagnosticId={id}
                deleteDisabled={selectedDiagnostics.length <= 1}
                onDelete={removeSelectedDiagnostic}
                models={modelsByDiagnosticId[id]}
              />
            ))}
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export { ChooseModels };
