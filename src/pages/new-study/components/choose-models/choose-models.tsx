import { Box, Stack } from '@mui/material';
import { SelectedDiagnosticAccordion } from './selected-diagnostic-accordion';
import { useNewStudyStore } from '../../store';
import { Diagnostic, useDiagnosticsStore } from '@/packages/diagnostics';
import { styles } from './styles';

const ChooseModels = () => {
  const availableDiagnostics = useDiagnosticsStore(
    (state) => state.availableDiagnostics,
  );
  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );
  const updateSelectedDiagnostictIds = useNewStudyStore(
    (state) => state.updateSelectedDiagnostictIds,
  );

  const selectedDiagnostics = selectedDiagnosticIds
    .map((id) =>
      availableDiagnostics.find((diagnostic) => diagnostic.id === id),
    )
    .filter((diagnostic): diagnostic is Diagnostic => Boolean(diagnostic));

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
                deleteDisabled={selectedDiagnostics.length <= 1}
                onDelete={removeSelectedDiagnostic}
              />
            ))}
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export { ChooseModels };
