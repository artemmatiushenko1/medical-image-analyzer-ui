import { useDiagnosticsStore } from '@/packages/diagnostics';
import { useNewStudyStore } from '@/pages/new-study/new-study.store';
import { ArchitectureRounded, Crop } from '@mui/icons-material';
import { Box, Chip, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { styles } from './styles';

const StudySummary = () => {
  const availableDiagnostics = useDiagnosticsStore(
    (state) => state.availableDiagnostics,
  );

  const studyImage = useNewStudyStore(
    (state) => state.croppedImageSrc || state.uploadedImageSrc,
  );

  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );

  const selectedDiagnostics = selectedDiagnosticIds.map((id) =>
    availableDiagnostics.find((diagnostic) => diagnostic.id === id),
  );

  return (
    <Stack sx={styles.root}>
      {studyImage && (
        <Box>
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Image
          </Typography>
          <Paper sx={styles.imageWrapperPaper}>
            <Box sx={styles.imageWrapper}>
              <Box component="img" src={studyImage} sx={styles.image} />
              <Tooltip title="The original image was cropped">
                <Box sx={styles.cropChip}>
                  <Crop fontSize="inherit" />
                  <span>Cropped</span>
                </Box>
              </Tooltip>
            </Box>
          </Paper>
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={styles.sectionTitle}>
          Selected diagnostics
        </Typography>
        <Stack gap={2}>
          {selectedDiagnostics.map((diagnostic) => (
            <Paper sx={styles.diagnosticsWrapper}>
              <Typography variant="body2" fontWeight={500}>
                {diagnostic?.title}
              </Typography>
              <Typography variant="caption" display="block">
                AI model configuration:
              </Typography>
              <Box>
                <Chip
                  color="primary"
                  sx={styles.modelSettingChip}
                  icon={<ArchitectureRounded sx={{ fontSize: '18px' }} />}
                  label={'Architecture: ARM64'}
                />
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export { StudySummary };
