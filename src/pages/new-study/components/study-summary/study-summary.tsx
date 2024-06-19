import { useNewStudyStore } from '@/pages/new-study/store';
import { SettingsSuggestRounded } from '@mui/icons-material';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Diagnostic, Model } from '@/packages/diagnostics';

type StudySummaryProps = {
  diagnosticsById: Record<string, Diagnostic>;
  modelsById: Record<string, Model>;
};

const StudySummary = (props: StudySummaryProps) => {
  const { diagnosticsById, modelsById } = props;

  const { t } = useTranslation('NewStudy');

  const studyImage = useNewStudyStore(
    (state) => state.croppedImageSrc ?? state.uploadedImageSrc,
  );

  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );

  const selectedModelIds = useNewStudyStore((state) => state.selectedModelIds);

  const selectedDiagnostics = selectedDiagnosticIds.map(
    (id) => diagnosticsById[id],
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
                {selectedModelIds[diagnostic.id]?.map((modelId) => {
                  const model = modelsById[modelId];

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
