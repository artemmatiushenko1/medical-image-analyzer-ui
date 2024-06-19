import { StudyStatus } from '@/packages/studies';
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
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DetailItemText } from '../detail-item-text';
import { StudyStatusChip } from '../study-status-chip';
import { styles } from './styles';
import { ConfidenceWidget } from '../confidence-widget';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { useSaveStudyReport } from '../../libs/hooks';
import { useGetStudy } from '../../libs/queries';
import { EmptyState } from '@/libs/components';
import { NoStudyResultsIcon } from '@/libs/components/icons';
import { StudyModelCard } from './study-model-card';
import { StudyDiagnosticCard } from './study-diagnostic-card';

type StudyDetailsDrawerProps = {
  open: boolean;
  studyId: string | null;

  onClose: () => void;
  onCloseFinished: () => void;
};

const StudyDetailsDrawer = (props: StudyDetailsDrawerProps) => {
  const { open, onClose, onCloseFinished, studyId } = props;

  const { t } = useTranslation('Studies');

  const { t: tCommon } = useTranslation('Common');

  const { data: study, isLoading: isStudyLoading } = useGetStudy(
    studyId,
    Boolean(studyId),
  );

  const {
    isLoading: isReportLoading,
    saveReport,
    getReportFilename,
  } = useSaveStudyReport();

  const reportFilename = study ? getReportFilename(study) : '';

  const renderDrawerContent = () => {
    if (isStudyLoading) {
      return <LoadingSkeleton />;
    }

    if (!study) return null;

    return (
      <>
        <DialogTitle>
          <Box sx={styles.titleInner}>
            <Typography
              display="inline-block"
              fontSize="18px"
              fontWeight={600}
              gutterBottom
            >
              {study.name}
            </Typography>
            <Tooltip title={tCommon('Minimise')}>
              <IconButton
                onClick={onClose}
                sx={{ color: ({ palette }) => palette.neutral.dark }}
              >
                <NavigateNextRounded />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack gap={3}>
            <Box sx={styles.meta}>
              <Stack>
                <Typography variant="caption" fontWeight={500} textAlign="left">
                  {t('StudyDetails.Status')}
                </Typography>
                <StudyStatusChip status={study.status} />
              </Stack>
              <Stack>
                <Typography
                  variant="caption"
                  fontWeight={500}
                  textAlign="right"
                >
                  {t('StudyDetails.DateOfCreation')}
                </Typography>
                <DetailItemText iconComponent={EventNote}>
                  {dayjs(study?.createdAt).format(
                    DateFormat.DAY_ABBREV_MONTH_YEAR,
                  )}
                </DetailItemText>
              </Stack>
            </Box>
            {study.description && (
              <Stack gap={1}>
                <Typography variant="subtitle2">
                  {t('StudyDetails.Description')}
                </Typography>
                <Typography variant="caption">{study.description}</Typography>
              </Stack>
            )}
            <Stack gap={2}>
              <Typography variant="subtitle2">
                {t('StudyDetails.Image')}
              </Typography>
              <Box sx={styles.imageWrapper}>
                <Box component="img" sx={styles.image} src={study.image.src} />
              </Box>
            </Stack>
            {study?.status === StudyStatus.PENDING && (
              <Stack gap={2}>
                <Typography variant="subtitle2">
                  {t('StudyDetails.Results')}
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: ({ shape }) => shape.borderRadius,
                  }}
                >
                  <Stack
                    sx={{ textAlign: 'center', alignItems: 'center', gap: 2 }}
                  >
                    <EmptyState
                      icon={<NoStudyResultsIcon />}
                      title={t('StudyDetails.NoResultsYet')}
                      description={t('StudyDetails.NoResult')}
                    />
                    <CircularProgress
                      disableShrink
                      size={20}
                      sx={{ animationDuration: '550ms' }}
                    />
                  </Stack>
                </Paper>
              </Stack>
            )}
            {study?.status === StudyStatus.COMPLETED && (
              <Stack gap={3}>
                <Stack gap={2}>
                  <Typography variant="subtitle2">Diagnostic</Typography>
                  <StudyDiagnosticCard name="Lime disease detection" />
                  <Typography variant="subtitle2">
                    {t('StudyDetails.AiModel')}
                  </Typography>
                  <StudyModelCard modelName={'Model name'} version={2} />
                </Stack>
                <Stack gap={2}>
                  {study?.confidence && (
                    <>
                      <Typography variant="subtitle2">
                        {t('StudyDetails.Confidence')}
                      </Typography>
                      <ConfidenceWidget confidence={study?.confidence} />
                    </>
                  )}
                </Stack>
                <Stack gap={2}>
                  <Typography variant="subtitle2">
                    {t('StudyDetails.Report')}
                  </Typography>
                  <Paper sx={styles.reportArea}>
                    <Typography variant="subtitle2" sx={styles.reportName}>
                      {reportFilename}
                    </Typography>
                    <IconButton
                      disabled={isReportLoading}
                      onClick={() => saveReport(study.id)}
                      sx={{
                        color: ({ palette }) => palette.primary.contrastText,
                      }}
                    >
                      {isReportLoading ? (
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      )}
                    </IconButton>
                  </Paper>
                </Stack>
              </Stack>
            )}
          </Stack>
        </DialogContent>
      </>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      onTransitionExited={onCloseFinished}
      anchor="right"
      PaperProps={{ sx: styles.paper }}
      ModalProps={{ keepMounted: false }}
    >
      {renderDrawerContent()}
    </Drawer>
  );
};

const LoadingSkeleton = () => {
  return (
    <>
      <DialogTitle>
        <Box sx={styles.titleInner}>
          <Typography
            display="inline-block"
            // fontSize="18px"
            variant="h5"
            fontWeight={600}
            gutterBottom
            sx={{ flex: 0.5 }}
          >
            <Skeleton component="div" animation="wave" />
          </Typography>
          <Skeleton component="div" animation="wave" variant="circular">
            <IconButton>
              <NavigateNextRounded />
            </IconButton>
          </Skeleton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack gap={3}>
          <Box sx={styles.meta}>
            <Stack>
              <Skeleton variant="rounded" sx={{ borderRadius: '100px' }}>
                <StudyStatusChip status={StudyStatus.COMPLETED} />
              </Skeleton>
            </Stack>
            <Stack>
              <Typography variant="caption" fontWeight={500} textAlign="right">
                <Skeleton />
              </Typography>
              <Skeleton>
                <DetailItemText iconComponent={EventNote}>
                  {dayjs().format(DateFormat.DAY_ABBREV_MONTH_YEAR)}
                </DetailItemText>
              </Skeleton>
            </Stack>
          </Box>
          <Stack gap={2}>
            <Typography variant="subtitle2" maxWidth={100}>
              <Skeleton />
            </Typography>
            <Skeleton variant="rounded">
              <Box sx={styles.imageWrapper}>
                <Box component="img" width={450} height={450} />
              </Box>
            </Skeleton>
          </Stack>
        </Stack>
      </DialogContent>
    </>
  );
};

export { StudyDetailsDrawer };
