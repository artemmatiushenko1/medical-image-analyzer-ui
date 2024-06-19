import { useNewStudyStore } from '@/pages/new-study/store';
import { SettingsSuggestRounded } from '@mui/icons-material';
import { Box, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Diagnostic, Model } from '@/packages/diagnostics';
import { formatVersionString } from '@/libs/helpers';

type StudySummaryProps = {
  diagnosticsById: Record<string, Diagnostic>;
  modelsById: Record<string, Model>;
};

const StudySummary = (props: StudySummaryProps) => {
  const { diagnosticsById, modelsById } = props;

  const { t } = useTranslation('NewStudy');

  const name = useNewStudyStore((state) => state.name);
  const description = useNewStudyStore((state) => state.description);
  const setName = useNewStudyStore((state) => state.setName);
  const setDescription = useNewStudyStore((state) => state.setDescription);

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
      <Stack gap={2}>
        <Stack gap={1}>
          <Stack>
            <Typography variant="subtitle2">
              {t('Summary.NameLabel')}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {t('Summary.NameDescription')}
            </Typography>
          </Stack>
          <TextField
            placeholder={t('Summary.NamePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Stack>
          <Stack>
            <Typography variant="subtitle2">
              {t('Summary.DescriptionLabel')}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {t('Summary.DescriptionCaption')}
            </Typography>
          </Stack>
          <TextField
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('Summary.DescriptionPlaceholder')}
          />
        </Stack>
      </Stack>
      <Stack direction="row" gap={2}>
        {studyImage && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
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
          <Typography variant="subtitle2" gutterBottom>
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

                    if (!model) return;

                    return (
                      <Chip
                        key={model?.id}
                        sx={styles.modelSettingChip}
                        label={`${model?.name} - ${formatVersionString(
                          model.currentVersion?.version ?? 0,
                        )}`}
                      />
                    );
                  })}
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export { StudySummary };
