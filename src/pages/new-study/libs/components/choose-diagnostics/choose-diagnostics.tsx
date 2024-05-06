import { MonitorHeart } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { DiagnosticCard } from './diagnostic-card';
import { styles } from './styles';
import { StudyInfoFormSectionHeader } from '../study-info-form/study-info-form-section-header';
import { SelectedDiagnosticAccordion } from './selected-diagnostic-accordion';
import { useNewStudyStore } from '@/pages/new-study/new-study.store';
import { Diagnostic, useDiagnosticsStore } from '@/packages/diagnostics';

const ChooseDiagnostics = () => {
  const availableDiagnostics = useDiagnosticsStore(
    (state) => state.availableDiagnostics,
  );
  const selectedDiagnosticsIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );
  const updateSelectedDiagnostictIds = useNewStudyStore(
    (state) => state.updateSelectedDiagnostictIds,
  );

  const selectedDiagnostics = selectedDiagnosticsIds
    .map((id) =>
      availableDiagnostics.find((diagnostic) => diagnostic.id === id),
    )
    .filter((diagnostic): diagnostic is Diagnostic => Boolean(diagnostic));

  const handleDiagnosticCardClick = (id: string) => {
    updateSelectedDiagnostictIds(id);
  };

  const removeSelectedDiagnostic = (idToRemove: string) => {
    updateSelectedDiagnostictIds(idToRemove);
  };

  return (
    <Box sx={styles.root}>
      <Stack sx={styles.left}>
        <Stack>
          <Typography variant="subtitle2">Available diagnostics</Typography>
          <Typography variant="caption">
            Click on the card to select a diagnostic for a image.
          </Typography>
        </Stack>
        <Box sx={styles.diagnosticsList}>
          {availableDiagnostics.map((item) => (
            <DiagnosticCard
              key={item.id}
              title={item.title}
              imgSrc={item.previewImg}
              selected={selectedDiagnosticsIds.indexOf(item.id) !== -1}
              onClick={() => handleDiagnosticCardClick(item.id)}
            />
          ))}
        </Box>
      </Stack>
      {selectedDiagnosticsIds.length > 0 && (
        <Stack sx={styles.right}>
          <StudyInfoFormSectionHeader
            icon={<MonitorHeart color="primary" />}
            description="Configure any available settings for each selected item."
            title="Selected diagnostics"
          />
          <Box sx={{ marginTop: '20px', overflowY: 'scroll', pb: 2 }}>
            {selectedDiagnostics.map(({ id, title }) => (
              <SelectedDiagnosticAccordion
                key={id}
                id={id}
                title={title}
                onDelete={removeSelectedDiagnostic}
              />
            ))}
          </Box>
          {!selectedDiagnosticsIds.length && (
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                height: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography textAlign="center" color="InactiveCaptionText">
                No diagnostics selected.
                <br /> Please choose them on the left side.
              </Typography>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
};

export { ChooseDiagnostics };
