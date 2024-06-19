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
      //   // TODO: use skeletons
      return <CircularProgress size="30px" />;
    }

    if (!study) return null;

    return (
      <>
        <DialogTitle>
          <Box sx={styles.titleInner}>
            <Box>
              <Typography
                display="inline-block"
                fontSize="18px"
                fontWeight={600}
              >
                {study.name}
              </Typography>
              <Typography variant="caption" fontSize="14px" display="block">
                {study.description ?? 'Study Description'}
              </Typography>
            </Box>
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
              <StudyStatusChip status={study.status} />
              <DetailItemText iconComponent={EventNote}>
                {dayjs(study?.createdAt).format(
                  DateFormat.YEAR_MONTH_DAY_DASHES,
                )}
              </DetailItemText>
            </Box>
            <Stack gap={2}>
              <Typography
                variant="subtitle2"
                sx={{ color: ({ palette }) => palette.neutral.dark }}
              >
                {t('StudyDetails.Image')}
              </Typography>
              <Box sx={styles.imageWrapper}>
                <Box component="img" sx={styles.image} src={study.image.src} />
              </Box>
            </Stack>
            <Stack gap={2}>
              {/* <Paper sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: ({ palette }) => palette.neutral.dark }}
              >
                {t('StudyDetails.AiModel')}
              </Typography>
              <Stack>
                <Stack direction="row" gap={3} alignItems="center">
                  <Box>
                    <HighlightedIcon rounded iconElement={<AiModelIcon />} />
                  </Box>
                  <Stack>
                    <Typography variant="body2">
                      {study?.model?.name}
                    </Typography>
                    <Typography variant="caption">Name</Typography>
                  </Stack>
                  <Stack sx={{ marginLeft: 'auto' }}>
                    <Typography variant="body2" textAlign="right">
                      {study?.model.currentVersion?.version &&
                        formatVersionString(
                          study?.model.currentVersion.version,
                        )}
                    </Typography>
                    <Typography variant="caption">Version</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper> */}
            </Stack>
            {study?.status === StudyStatus.PENDING && (
              <Paper
                sx={{
                  p: 2,
                  borderRadius: ({ shape }) => shape.borderRadius,
                }}
              >
                <Stack
                  sx={{ textAlign: 'center', alignItems: 'center', gap: 2 }}
                >
                  <CircularProgress
                    disableShrink
                    size={20}
                    sx={{ animationDuration: '550ms' }}
                  />
                  <Typography variant="caption">
                    {t('StudyDetails.NoResult')}
                  </Typography>
                </Stack>
              </Paper>
            )}
            {study?.status === StudyStatus.COMPLETED && (
              <Stack gap={3}>
                <Stack gap={2}>
                  {study?.confidence && (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: ({ palette }) => palette.neutral.dark }}
                      >
                        {t('StudyDetails.Confidence')}
                      </Typography>
                      <ConfidenceWidget confidence={study?.confidence} />
                    </>
                  )}
                </Stack>
                <Stack gap={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: ({ palette }) => palette.neutral.dark }}
                  >
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

export { StudyDetailsDrawer };
