import { useNewStudyStore } from '@/pages/new-study/store';
import { SettingsSuggestRounded } from '@mui/icons-material';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

const StudySummary = () => {
  const { t } = useTranslation('NewStudy');

  const availableDiagnostics = useNewStudyStore(
    (state) => state.availableDiagnostics,
  );

  const availableModels = useNewStudyStore((state) => state.availableModels);

  const studyImage = useNewStudyStore(
    (state) => state.croppedImageSrc || state.uploadedImageSrc,
  );

  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );

  const selectedModelIds = useNewStudyStore((state) => state.selectedModelIds);

  const selectedModels = selectedModelIds.map((id) =>
    availableModels.find((model) => model.id === id),
  );

  const selectedDiagnostics = selectedDiagnosticIds.map((id) =>
    availableDiagnostics.find((diagnostic) => diagnostic.id === id),
  );

  return (
    <Stack sx={styles.root}>
      {studyImage && (
        <Box>
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            {t('Summary.Image')}
          </Typography>
          <Paper sx={styles.imageWrapperPaper}>
            <Box sx={styles.imageWrapper}>
              <Box component="img" src={studyImage} sx={styles.image} />
            </Box>
          </Paper>
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={styles.sectionTitle}>
          {t('Summary.SelectedDiagnostics')}
        </Typography>
        <Stack gap={2}>
          {selectedDiagnostics.map((diagnostic) => (
            <Paper key={diagnostic?.id} sx={styles.diagnosticsWrapper}>
              <Typography variant="body2" fontWeight={500}>
                {diagnostic?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
              >
                <SettingsSuggestRounded sx={{ fontSize: '18px' }} />{' '}
                {t('Summary.AiModels')}
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {selectedModels.map((model) => {
                  return (
                    <Chip
                      key={model?.id}
                      sx={styles.modelSettingChip}
                      label={model?.name}
                    />
                  );
                })}
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export { StudySummary };
