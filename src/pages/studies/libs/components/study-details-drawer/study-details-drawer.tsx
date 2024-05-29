import { Study, StudyStatus } from '@/packages/studies';
import { EventNote, NavigateNextRounded } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DetailItemText } from '../detail-item-text';
import { StudyStatusChip } from '../study-status-chip';
import { styles } from './styles';
import { ConfidenceWidget } from '../confidence-widget';
import { useAuthStore } from '@/packages/auth';
import { useSavePdf } from '@/libs/hooks';
import { StudyReportDocument } from '../../pdf-templates';

type StudyDetailsDrawerProps = {
  open: boolean;
  study: Study;

  onClose: () => void;
  onCloseFinished: () => void;
};

const StudyDetailsDrawer = (props: StudyDetailsDrawerProps) => {
  const { open, onClose, study, onCloseFinished } = props;

  const { savePdf, isLoading: isPdfLoading } = useSavePdf();

  const currentUser = useAuthStore((state) => state.user);

  const reportFilename = `study_${study.id}_report_${study.date?.replaceAll(
    ' ',
    '_',
  )}.pdf`;

  const handleReportDownload = () => {
    if (!currentUser) return;

    savePdf(
      <StudyReportDocument study={study} issuer={currentUser} />,
      reportFilename,
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      onTransitionExited={onCloseFinished}
      anchor="right"
      PaperProps={{ sx: styles.paper }}
    >
      <DialogTitle>
        <Box sx={styles.titleInner}>
          <Box>
            <Typography display="inline-block" fontSize="18px" fontWeight={600}>
              {study.diagnostic}
            </Typography>
            <Typography variant="caption" fontSize="14px" display="block">
              #{study.id}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ color: ({ palette }) => palette.neutral.dark }}
          >
            <NavigateNextRounded />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack gap={3}>
          <Box sx={styles.meta}>
            <StudyStatusChip status={study.status} />
            <DetailItemText iconComponent={EventNote}>
              {study.date}
            </DetailItemText>
          </Box>
          <Stack gap={2}>
            <Typography
              fontSize="14px"
              fontWeight={600}
              sx={{ color: ({ palette }) => palette.neutral.dark }}
            >
              Image
            </Typography>
            <Box sx={styles.imageWrapper}>
              <Box component="img" sx={styles.image} src={study.imageSrc} />
            </Box>
          </Stack>
          {study.status === StudyStatus.PENDING && (
            <Paper
              sx={{
                p: 2,
                borderRadius: ({ shape }) => shape.borderRadius,
              }}
            >
              <Stack sx={{ textAlign: 'center', alignItems: 'center', gap: 2 }}>
                <CircularProgress
                  disableShrink
                  size={20}
                  sx={{ animationDuration: '550ms' }}
                />
                <Typography variant="caption">
                  There's no result available yet.
                  <br /> The image is still being examined by AI.
                </Typography>
              </Stack>
            </Paper>
          )}
          {study.status === StudyStatus.COMPLETED && (
            <Stack gap={3}>
              <Stack gap={2}>
                {study.confidence && (
                  <>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      sx={{ color: ({ palette }) => palette.neutral.dark }}
                    >
                      Confidence
                    </Typography>
                    <ConfidenceWidget confidence={study.confidence} />
                  </>
                )}
              </Stack>
              <Stack gap={2}>
                <Typography
                  fontSize="14px"
                  fontWeight={600}
                  sx={{ color: ({ palette }) => palette.neutral.dark }}
                >
                  Report
                </Typography>
                <Paper sx={styles.reportArea}>
                  <Typography variant="subtitle2" sx={styles.reportName}>
                    {reportFilename}
                  </Typography>
                  <IconButton
                    disabled={isPdfLoading}
                    onClick={handleReportDownload}
                    sx={{
                      color: ({ palette }) => palette.primary.contrastText,
                    }}
                  >
                    {isPdfLoading ? (
                      <CircularProgress size="20px" sx={{ color: '#fff' }} />
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="20px"
                        width="20px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    )}
                  </IconButton>
                </Paper>
              </Stack>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Drawer>
  );
};

export { StudyDetailsDrawer };
