import { MonitorHeart } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { DiagnosticCard } from './diagnostic-card';
import { styles } from './styles';
import { StudyInfoFormSectionHeader } from '../study-info-form/study-info-form-section-header';
import { SelectedDiagnosticAccordion } from './selected-diagnostic-accordion';
import { useNewStudyStore } from '@/pages/new-study/store';
import { Diagnostic, useDiagnosticsStore } from '@/packages/diagnostics';
import { MAX_SELECTED_DIAGNOSTICS } from '../../libs/constants';
import { useTranslation } from 'react-i18next';

const ChooseDiagnostics = () => {
  const { t } = useTranslation('NewStudy');

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

  const handleDiagnosticCardClick = (id: string) => {
    if (
      selectedDiagnosticIds.length >= MAX_SELECTED_DIAGNOSTICS &&
      !selectedDiagnosticIds.includes(id)
    ) {
      return;
    }

    updateSelectedDiagnostictIds(id);
  };

  const removeSelectedDiagnostic = (idToRemove: string) => {
    updateSelectedDiagnostictIds(idToRemove);
  };

  return (
    <Box sx={styles.root}>
      <Stack sx={styles.left}>
        <Box sx={styles.diagnosticsList}>
          {availableDiagnostics.map((item) => (
            <DiagnosticCard
              disabled={
                selectedDiagnosticIds.length >= MAX_SELECTED_DIAGNOSTICS &&
                !selectedDiagnosticIds.includes(item.id)
              }
              key={item.id}
              title={item.name}
              imgSrc={item.previewImg}
              selected={selectedDiagnosticIds.indexOf(item.id) !== -1}
              onClick={() => handleDiagnosticCardClick(item.id)}
            />
          ))}
        </Box>
      </Stack>
      {selectedDiagnosticIds.length > 0 && (
        <Stack sx={styles.right}>
          <StudyInfoFormSectionHeader
            icon={<MonitorHeart color="primary" />}
            title={t('SelectedDiagnosticsTitle')}
            description={t('SelectedDiagnosticsCaption')}
          />
          <Box sx={{ marginTop: '20px', overflowY: 'scroll', pb: 2 }}>
            {selectedDiagnostics.map(({ id, name }) => (
              <SelectedDiagnosticAccordion
                key={id}
                id={id}
                title={name}
                onDelete={removeSelectedDiagnostic}
              />
            ))}
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export { ChooseDiagnostics };
