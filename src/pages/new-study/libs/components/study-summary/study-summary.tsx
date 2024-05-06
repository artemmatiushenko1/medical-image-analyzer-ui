import { useDiagnosticsStore } from '@/packages/diagnostics';
import { useNewStudyStore } from '@/pages/new-study/new-study.store';
import { ArchitectureRounded, Crop } from '@mui/icons-material';
import {
  Box,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { grey } from '@mui/material/colors';

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
    <Stack
      sx={{ maxWidth: '800px', width: '100%', gap: 2, paddingTop: '90px' }}
    >
      <Box>
        <Typography fontWeight={500}>Study Overview</Typography>
        <Typography variant="caption">
          Please review the study summary. Once the study is created it won't be
          possible to edit it.
        </Typography>
      </Box>
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          borderRadius: ({ shape }) => shape.borderRadius,
          flexDirection: 'row',
          gap: 4,
        }}
      >
        {studyImage && (
          <Box>
            <Typography
              variant="subtitle2"
              marginBottom={1}
              sx={{ color: grey[500] }}
            >
              Image
            </Typography>
            <Box
              sx={{
                width: '200px',
                height: '200px',
                backgroundColor: ({ palette }) => palette.grey[200],
                border: ({ palette }) => `1px solid ${palette.divider}`,
                borderRadius: ({ shape }) => shape.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={studyImage}
                sx={{ height: '100%', objectFit: 'contain' }}
              />
              <Tooltip title="The original image was cropped">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '12px',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: ({ palette }) =>
                      alpha(palette.primary.main, 0.4),
                    color: ({ palette }) => palette.common.white,
                    borderRadius: '100px',
                    p: '2px 6px',
                    border: ({ palette }) =>
                      `1px solid ${palette.primary.main}`,
                  }}
                >
                  <Crop fontSize="inherit" />
                  <span>Cropped</span>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        )}
        <Stack sx={{ flex: 1, gap: 1 }}>
          <Typography variant="subtitle2" sx={{ color: grey[500] }}>
            Selected diagnostics
          </Typography>
          <Stack gap={2}>
            {selectedDiagnostics.map((diagnostic) => (
              <Paper
                elevation={5}
                sx={{
                  p: 2,
                  borderRadius: ({ shape }) => shape.borderRadius,
                  gap: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {diagnostic?.title}
                </Typography>
                <Typography variant="caption" display="block">
                  AI model configuration:
                </Typography>
                <Box>
                  <Chip
                    color="primary"
                    sx={{
                      fontSize: '12px',
                      backgroundColor: ({ palette }) =>
                        alpha(palette.primary.main, 0.1),
                      border: ({ palette }) =>
                        `1px solid ${palette.primary.main}`,
                      color: ({ palette }) => palette.primary.main,
                    }}
                    icon={<ArchitectureRounded sx={{ fontSize: '18px' }} />}
                    label={'Architecture: ARM64'}
                  />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export { StudySummary };
